exports.createNameSpace = (io) => {
		IO = io;
		nsp = io.of('/room');
		nsp.on('connection', socket => {
			let roomID = null;
			
			socket.on('create-room', (data, fn) => {
				console.log('data :', data);
				socket.join(data);
				roomID = data;
				fn({name: data});
			});

			socket.on('connect-room', (roomId, name, fn) => {
				if(io.nsps['/room'].adapter.rooms[roomId] && io.nsps['/room'].adapter.rooms[roomId].length > 1) {
					console.log('Cancel connect');
					socket.emit('message', 'Too many users in room already');
				} else {
					roomID = roomId
					socket.join(roomId);
					console.log(roomId);
					socket.to(roomId).emit('send-username', name);
					socket.to(roomId).emit('partner-connected');
					nsp.to(roomId).emit('message', 'Joined to room', 'success');
					socket.emit('start-video');
					fn(true);
				};
			});

			socket.on('send-room-info', data => {
				nsp.to(roomID).emit('room-info', data);
			});

			socket.on('code-changed', (data) => {
				nsp.to(roomID).emit('new-code', data);
			});

			socket.on('description-changed', (data) => {
				socket.to(roomID).emit('new-desc', data);
			});

			socket.on('exit-room', () => {
				console.log(1)
				nsp.to(roomID).emit('end-video');
				nsp.to(roomID).emit('partner-disconnected');
				socket.leave(roomID);
			});

			socket.on('disconnect', (reason) => {
				nsp.to(roomID).emit('message', 'Partner Disconnected', 'success');
				// nsp.to(roomID).emit('end-video');
			});
		});		
}