exports.createNameSpace = (io) => {
		IO = io;
		nsp = io.of('/room');
		nsp.on('connection', socket => {
			let roomID = null;
			socket.on('create-room', (data, fn) => {
				socket.join(data);
				roomID = data;
				fn('Room Created ', data)
			});

			socket.on('connect-room', (roomId, fn) => {
				if(io.nsps['/room'].adapter.rooms[roomId] && IO.nsps['/room'].adapter.rooms[roomId].length > 1) {
					console.log('Cancel connect');
					socket.emit('message', 'Too many users in room already');
				} else {
					roomID = roomId
					socket.join(roomId);
					fn(true);
					nsp.to(roomId).emit('message', 'Joined to room', 'success');
					socket.to(roomId).emit('partner-connected');
					socket.emit('get-invited-user-name');
					socket.emit('start-video');

					
				};
				
			});

			socket.on('code-changed', (data) => {
				console.log(data);
				nsp.to(roomID).emit('new-code', data);
			});			
			socket.on('description-changed', (data) => {
				console.log(roomID);

				socket.to(roomID).emit('new-desc', data);
			});
		})
}