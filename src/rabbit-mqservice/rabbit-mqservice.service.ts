import * as amqp from 'amqplib';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class RabbitMqserviceService {
    private channel;

    constructor(private readonly mailerService: MailerService) {
        this.init(); // Initialize the RabbitMQ channel when the service is constructed
    }

    private async init() {
        try {
            const connection = await amqp.connect('amqp://localhost');
            this.channel = await connection.createChannel();
            const emailQueue = 'order_email_queue';
            await this.channel.assertQueue(emailQueue, { durable: true });

            // Consume messages from the email queue
            this.channel.consume(emailQueue, (msg) => {
                if (msg !== null) {
                    const orderDetails = JSON.parse(msg.content.toString());
                    this.sendOrderEmail(orderDetails);
                    this.channel.ack(msg);
                }
            });
        } catch (error) {
            console.error('Error initializing RabbitMQ channel:', error);
        }
    }

    private async sendOrderEmail(orderDetails: any) {
        try {
            await this.mailerService.sendMail({
                to: orderDetails.email,
                from: 'ayushijain0807@gmail.com',
                subject: 'Thank you for your order',
                text: 'Your order is successfully placed',
                html: '<b>Your order is successfully placed</b>',
            });
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }

    async sendOrderEmailNotification(email: string, productName: string) {
        if (!this.channel) {
            console.error('RabbitMQ channel is not initialized.');
            return;
        }
        const emailQueue = 'order_email_queue';
        await this.channel.assertQueue(emailQueue, { durable: true });
        await this.channel.sendToQueue(emailQueue, Buffer.from(JSON.stringify({ email, productName })));
    }
}
