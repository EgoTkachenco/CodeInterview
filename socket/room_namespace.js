exports.createNameSpace = (io) => {
		IO = io;
		nsp = io.of('/room');
		nsp.on('connection', socket => {
			let roomID = '';
			
			socket.on('create-room', (data, fn) => {
				roomID = data;
				socket.join(roomID);
				fn('Room Created ', data)
			});

			socket.on('connect-room', (roomId, fn) => {
				if(io.nsps['/room'].adapter.rooms[roomId] && IO.nsps['/room'].adapter.rooms[roomId].length > 1) {
					console.log('Cancel connect');
					socket.emit('socket-error', 'Too many users in room already');
				} else {
					socket.join(roomId);
					roomID = roomId;
					fn('Joined to room');
					nsp.to(roomID).emit('userJoin');
					socket.to(roomID).emit('start-video');
				};
				
			});

			socket.on('code-changed', (data) => {
				socket.to(roomID).emit('new-code', data);
			});
			socket.on('send-invite-offer', (data) => {
				socket.to(roomID).emit('invite-offer', data);
				socket.emit('message', 'sender');
			});
			socket.on('send-answer-offer', (offer) =>{
				socket.to(roomID).emit('answer-offer', offer);
			})
			
			
		})
}