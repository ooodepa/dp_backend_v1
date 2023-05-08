import { ApiPropertyOptions } from '@nestjs/swagger';

interface IProps {
  dp_id: ApiPropertyOptions;
  dp_name: ApiPropertyOptions;
  dp_isHidden: ApiPropertyOptions;
}

const ContactTypesApiProperty: IProps = {
  dp_id: {
    example: 1,
  },
  dp_name: {
    example: 'whatsapp',
  },
  dp_isHidden: {
    example: false,
  },
};

export default ContactTypesApiProperty;
