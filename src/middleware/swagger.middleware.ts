import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const SwaggerConfig = new DocumentBuilder()
  .setTitle('REST API документация')
  .setDescription(
    '' +
      'Роли: \n\n' +
      '- [any](#/any) - любой пользователь может выполнять запрос \n\n' +
      '- [user](#/user) - зарегистрированный пользователь может выполнять запрос \n\n' +
      '- [ADMIN](#/ADMIN) - зарегистрированный пользователь с ролью ADMIN может выполнять запрос \n\n' +
      '- [MANAGER](#/MANAGER) - зарегистрированный пользователь с ролью MANAGER может выполнять запрос \n\n' +
      '' +
      'Эндпоинты: \n\n' +
      '- [/api/v1/users](#/api_v1_users) - регистрация, подтверждение аккаунта, забыли пароль, смена пароля, смена e-mail, отмена смены e-mail \n\n' +
      '- [/api/v1/sessions](#/api_v1_sessions) - работа с сессиями \n\n' +
      '- [/api/v1/apk-versions](#/api_v1_apk-versions) - информация о последней версии для Android \n\n' +
      '- [/api/v1/item-characteristics](#/api_v1_item-characteristics) - характеристики номенклатуры \n\n' +
      '- [/api/v1/item-brands](#/api_v1_item-brands) - производители номенклатуры \n\n' +
      '- [/api/v1/item-categories](#/api_v1_item-categories) - категории номенклатуры \n\n' +
      '- [/api/v1/items](#/api_v1_items) - номенклатура \n\n' +
      '- [/api/v1/favorite-items](#/api_v1_favorite-items) - избранные \n\n' +
      '- [/api/v1/orders](#/api_v1_orders) - заказы \n\n' +
      '- [/api/v1/articles](#/api_v1_articles) - новости (статьи) \n\n' +
      '- [/api/v1/contact-types](#/api_v1_contact-types) - типы контактов \n\n' +
      '- [/api/v1/invoice](#/api_v1_invoice) - остатки \n\n' +
      '- [/api/v1/helpers](#/api_v1_helpers) - контакты юр. лица для клиентов \n\n' +
      '- [/api/v1/manager](#/api_v1_manager) - эндпоинты для менеджера \n\n' +
      '' +
      /*
      '**Таблица - Роли и их доступные эндпоинты** \n\n' +
      '|Роль|Метод|Эндпоинт| \n' +
      '|---|---|---| \n' +
      '|any|POST|/api/v1/users| \n' +
      '|any|GET|/api/v1/users/activate-account/{token}| \n' +
      '|user|PATCH|/api/v1/users/change-email| \n' +
      '|any|GET|/api/v1/users/change-email/{token}/confirm| \n' +
      '|any|GET|/api/v1/users/change-email/{token}/delete| \n' +
      '|any|POST|/api/v1/users/forget-password| \n' +
      '|user|PATCH|/api/v1/users/change-password| \n' +
      '| | | \n' +
      '|any|POST|/api/v1/sessions| \n' +
      '|user|GET|/api/v1/sessions| \n' +
      '|any|PATCH|/api/v1/sessions| \n' +
      '|user|DELETE|/api/v1/sessions| \n' +
      '|user|POST|/api/v1/sessions/logout| \n' +
      '|user|DELETE|/api/v1/sessions/{id}| \n' +
      '| | | \n' +
      '|any|GET|/api/v1/apk-versions| \n' +
      '| | | \n' +
      '|ADMIN|POST|/api/v1/item-characteristics| \n' +
      '|any|GET|/api/v1/item-characteristics| \n' +
      '|ADMIN|POST|/api/v1/item-characteristics/bulk| \n' +
      '|ADMIN|PUT|/api/v1/item-characteristics/bulk| \n' +
      '|any|GET|/api/v1/item-characteristics/{id}| \n' +
      '|ADMIN|PATCH|/api/v1/item-characteristics/{id}| \n' +
      '|ADMIN|DELETE|/api/v1/item-characteristics/{id}| \n' +
      '| | | \n' +
      '|ADMIN|POST|/api/v1/item-brands| \n' +
      '|any|GET|/api/v1/item-brands| \n' +
      '|ADMIN|POST|/api/v1/item-brands/bulk| \n' +
      '|ADMIN|PUT|/api/v1/item-brands/bulk| \n' +
      '|any|GET|/api/v1/item-brands/{id}| \n' +
      '|ADMIN|PATCH|/api/v1/item-brands/{id}| \n' +
      '|ADMIN|DELETE|/api/v1/item-brands/{id}| \n' +
      '| | | \n' +
      '|ADMIN|POST|/api/v1/item-categories| \n' +
      '|any|GET|/api/v1/item-categories| \n' +
      '|ADMIN|POST|/api/v1/item-categories/bulk| \n' +
      '|ADMIN|PUT|/api/v1/item-categories/bulk| \n' +
      '|any|GET|/api/v1/item-categories/{id}| \n' +
      '|ADMIN|PATCH|/api/v1/item-categories/{id}| \n' +
      '|ADMIN|DELETE|/api/v1/item-categories/{id}| \n' +
      '| | | \n' +
      '|ADMIN|POST|/api/v1/items| \n' +
      '|any|GET|/api/v1/items| \n' +
      '|ADMIN|POST|/api/v1/items/bulk| \n' +
      '|ADMIN|PUT|/api/v1/items/bulk| \n' +
      '|any|GET|/api/v1/items//model/{model}| \n' +
      '|any|POST|/api/v1/items/filter/models| \n' +
      '|any|GET|/api/v1/items/search/{search}| \n' +
      '|any|GET|/api/v1/items/search-all/{search}| \n' +
      '|any|GET|/api/v1/items/{id}| \n' +
      '|ADMIN|PATCH|/api/v1/items/{id}| \n' +
      '|ADMIN|DELETE|/api/v1/items/{id}| \n' +
      '| | | \n' +
      '|user|POST|/api/v1/favorite-items/{id}| \n' +
      '|user|DELETE|/api/v1/favorite-items/{id}| \n' +
      '|user|GET|/api/v1/favorite-items| \n' +
      '| | | \n' +
      '|user|POST|/api/v1/order| \n' +
      '|any|GET|/api/v1/order| \n' +
      '|user|GET|/api/v1/order/{id}| \n' +
      '|MODER|PATCH|/api/v1/order/{id}/completed| \n' +
      '|user|PATCH|/api/v1/order/{id}/cancel| \n' +
      '| | | \n' +
      '|ADMIN|POST|/api/v1/articles| \n' +
      '|any|GET|/api/v1/articles| \n' +
      '|ADMIN|POST|/api/v1/articles/bulk| \n' +
      '|any|GET|/api/v1/articles/url/{url}| \n' +
      '|any|GET|/api/v1/articles/{id}| \n' +
      '|ADMIN|PATCH|/api/v1/articles/{id}| \n' +
      '|ADMIN|DELETE|/api/v1/articles/{id}| \n' +
      '| | | \n' +
      '|ADMIN|POST|/api/v1/contact-types| \n' +
      '|any|GET|/api/v1/contact-types| \n' +
      '|ADMIN|POST|/api/v1/contact-types/bulk| \n' +
      '|any|GET|/api/v1/contact-types/{id}| \n' +
      '|ADMIN|PATCH|/api/v1/contact-types/{id}| \n' +
      '|ADMIN|DELETE|/api/v1/contact-types/{id}| \n' +
      '| | | \n' +
      '|ADMIN|POST|/api/v1/helpers| \n' +
      '|any|GET|/api/v1/helpers| \n' +
      '|ADMIN|POST|/api/v1/helpers/bulk| \n' +
      '|any|GET|/api/v1/helpers/{id}| \n' +
      '|ADMIN|PATCH|/api/v1/helpers/{id}| \n' +
      '|ADMIN|DELETE|/api/v1/helpers/{id}| \n' +
      */
      '',
  )
  .setVersion('1.0.0')
  .addTag('api_v1_users', 'Регистрация')
  .addTag('api_v1_sessions', 'Работа с сессиями')
  .addTag('api_v1_apk-versions', 'Информация о последней версии для Android')
  .addTag('api_v1_item-characteristics', 'Характеристики номенклатуры')
  .addTag('api_v1_item-brands', 'Производители номенклатуры')
  .addTag('api_v1_item-categories', 'Категории номенклатуры')
  .addTag('api_v1_items', 'Номенклатура')
  .addTag('api_v1_favorite-items', 'Избранные')
  .addTag('api_v1_orders', 'Заявка номенклатуры')
  .addTag('api_v1_articles', 'Новости (статьи)')
  .addTag('api_v1_contact-types', 'Типы контакта')
  .addTag('api_v1_helpers', 'Контакты (список контактов юр. лица для клиентов)')
  .addTag('api_v1_manager', 'Эндпоинты для менеджера')
  .addTag('any', 'Для любого пользователя')
  .addTag('user', 'Для зарегистированных пользователей (нужен токен доступа)')
  .addTag(
    'ADMIN',
    'Для зарегистированных пользователей (нужен access токен и роль ADMIN)',
  )
  .addTag(
    'MANAGER',
    'Для зарегистированных пользователей (нужен access токен и роль MANAGER)',
  )
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'access token - токен доступа',
      in: 'header',
    },
    'access-token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
  )
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'refresh token - токен обновления',
      in: 'header',
    },
    'refresh-token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
  )
  .build();

export function setupSwagger(app: INestApplication, GLOBAL_PREFIX: string) {
  const document = SwaggerModule.createDocument(app, SwaggerConfig);

  app.use(`${GLOBAL_PREFIX}/swagger.json`, (req, res) => {
    res.json(document);
  });

  SwaggerModule.setup(`${GLOBAL_PREFIX}/swagger`, app, document);
}
