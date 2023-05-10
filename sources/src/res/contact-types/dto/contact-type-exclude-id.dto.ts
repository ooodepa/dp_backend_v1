import { Exclude } from 'class-transformer';

import ContactTypeDto from './contact-type.dto';

export default class ContactTypeExcludeIdDto extends ContactTypeDto {
  @Exclude()
  dp_id: number;
}
