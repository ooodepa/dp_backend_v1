import { PartialType } from '@nestjs/swagger';

import { ContactTypeCreateDto } from './create-contact-type.dto';

export class ContactTypeUpdateDto extends PartialType(ContactTypeCreateDto) {}
