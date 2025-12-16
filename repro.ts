import { describe, it } from 'node:test';
import type { Delivery, EventContext, Message, Container } from 'rhea';
import rhea from 'rhea'

describe('Rhea', () => {

	describe('Basics', () => {
		it('can connect to rmq4', async() => {
			const container = rhea.connect({
				username: 'guest',
				password: 'guest',
				host: '127.0.0.1',
				transport: 'tcp',
				port: 5672,
				reconnect: false
			});
			container.on('connection_open', (context: EventContext) => {
				console.log('Connected to RabbitMQ', context.container);
				context.connection.open_receiver({
					credit_window: 1,
					autoaccept: true,
					autosettle: true,

				});
			});

			container.on('receiver_open', () => {
				console.log('receiver link established');
			});
			container.on('message', (context: EventContext) => {
				console.log('message', context.message);
			});
			container.on('error', err => {
				console.error(err);
			})

			container.on('disconnected', (context: EventContext) => {
				if (context.error) {
					console.error('Disconnected due to error: %s', context.error);
				} else {
					console.log('Disconnected');
				}

				if (context.reconnecting) {
					console.log('Attempting to reconnect...');
				} else {
					console.log('Exiting');
				}
			});
		});
	});
});
