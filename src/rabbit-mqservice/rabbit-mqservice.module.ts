import { RabbitMqserviceService } from './rabbit-mqservice.service';
import { Module } from '@nestjs/common';

@Module({
    providers: [RabbitMqserviceService],
    exports: [RabbitMqserviceService]
})
export class RabbitMqserviceModule { }




