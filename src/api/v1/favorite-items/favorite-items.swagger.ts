import { ApiPropertyOptions } from '@nestjs/swagger';

interface IProps {
  dp_id: ApiPropertyOptions;
  dp_userId: ApiPropertyOptions;
  dp_itemId: ApiPropertyOptions;
}

const FavoriteItemsApiProperty: IProps = {
  dp_id: {
    example: 1,
  },
  dp_userId: {
    example: 1,
  },
  dp_itemId: {
    example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  },
};

export default FavoriteItemsApiProperty;
