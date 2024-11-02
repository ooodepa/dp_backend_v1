import axios from 'axios';
import { Cron } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OzonSellerProductInfoEntity } from './entities/ozon-seller-product-info.entity';
import { OzonSellerProductListEntity } from './entities/ozon-seller-product-list.entity';
import { OzonSellerProductInfoResponse } from './dto/ozon-seller-product-info-response.dto';
import { OsonSellerProductListResponse } from './dto/ozon-seller-product-list-response.dto';
import { OsonSellerProductInfoBodyJson } from './dto/ozon-seller-product-info-body-json.dto';
import { OsonSellerProductListBodyJson } from './dto/ozon-seller-product-list-body-json.dto';

@Injectable()
export class OzonSellerProductListService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
    @InjectRepository(OzonSellerProductListEntity)
    private readonly ozonSellerProductListEntity: Repository<OzonSellerProductListEntity>,
    @InjectRepository(OzonSellerProductInfoEntity)
    private readonly ozonSellerProductInfoEntity: Repository<OzonSellerProductInfoEntity>,
  ) {}

  async getListProducts() {
    return await this.ozonSellerProductListEntity.find();
  }

  async getInfoProducts() {
    return await this.ozonSellerProductInfoEntity.find();
  }

  @Cron('10,30,50 * * * *') // At minute 10, 30, and 50.
  async updateProductList() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const ARRAY = await this.fetchConvertedProductList__All();

      await queryRunner.manager
        .getRepository(OzonSellerProductListEntity)
        .delete({});

      await queryRunner.manager
        .getRepository(OzonSellerProductListEntity)
        .save(ARRAY);

      await queryRunner.commitTransaction();
      return 'Таблица в базе данных очищена и загружены новый данные, которые спарсил';
    } catch (exception) {
      await queryRunner.rollbackTransaction();
      return `${exception}`;
    }
  }

  @Cron('10,30,50 * * * *') // At minute 10, 30, and 50.
  async updateProductInfo() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const ARRAY = await this.fetchConvertedProductInfo__Array();

      await queryRunner.manager
        .getRepository(OzonSellerProductInfoEntity)
        .delete({});

      await queryRunner.manager
        .getRepository(OzonSellerProductInfoEntity)
        .save(ARRAY);

      await queryRunner.commitTransaction();
      return 'Таблица в базе данных очищена и загружены новый данные, которые спарсил';
    } catch (exception) {
      await queryRunner.rollbackTransaction();
      return `${exception}`;
    }
  }

  async fetchConvertedProductList__All() {
    const ARRAY = await this.fetchProductList__All();
    return ARRAY.map((e) => {
      return {
        product_id: e.product_id,
        offer_id: e.offer_id,
        is_fbo_visible: e.is_fbo_visible,
        is_fbs_visible: e.is_fbs_visible,
        archived: e.archived,
        is_discounted: e.is_discounted,
        _raw_json: JSON.stringify(e),
      };
    });
  }

  async fetchProductList__All() {
    const ARCHIVED_PRODUCT_LIST = await this.fetchProductList__Archived();
    const NOT_ARCHIVED_PRODUCT_LIST =
      await this.fetchProductList__NotArchived();
    const ALL_PRODUCT_LIST = ARCHIVED_PRODUCT_LIST.concat(
      NOT_ARCHIVED_PRODUCT_LIST,
    );
    return ALL_PRODUCT_LIST;
  }

  async fetchProductList__Archived() {
    const BODY_JSON: OsonSellerProductListBodyJson = {
      limit: 10000,
      filter: {
        visibility: 'ARCHIVED',
      },
    };

    const ARRAY = (await this.fetchJson__OzonSellerProductList(BODY_JSON))
      .result.items;
    return ARRAY;
  }

  async fetchProductList__NotArchived() {
    const BODY_JSON: OsonSellerProductListBodyJson = {
      limit: 10000,
      filter: {
        visibility: 'ALL',
      },
    };

    const ARRAY = (await this.fetchJson__OzonSellerProductList(BODY_JSON))
      .result.items;
    return ARRAY;
  }

  async fetchJson__OzonSellerProductList(
    BODY_JSON: OsonSellerProductListBodyJson,
  ): Promise<OsonSellerProductListResponse> {
    try {
      const URI = `/v2/product/list`;
      const FETCH_URL = `https://api-seller.ozon.ru${URI}`;
      console.log(FETCH_URL);

      const HEADERS = {
        'Content-Type': 'application/json', // Указываем, что передаем данные в формате JSON
        'Client-Id': this.configService.get<string>('OZON__CLIENT_ID'),
        'Api-Key': this.configService.get<string>('OZON__API_KEY'),
      };

      const RESPONSE = await axios.post(FETCH_URL, BODY_JSON, {
        headers: HEADERS,
      });

      if (RESPONSE.status !== 200) {
        throw new Error(`HTTP status ${RESPONSE.status}`);
      }

      const JSON_: OsonSellerProductListResponse = await RESPONSE.data;
      return JSON_;
    } catch (exception) {
      console.error(exception);
      throw exception;
    }
  }

  async fetchConvertedProductInfo__Array() {
    const PRODUCT_LIST = await this.fetchProductList__All();
    const PRODUCT_INFO_ARRAY = [];
    for (let i = 0; i < PRODUCT_LIST.length; ++i) {
      const CURRENT_PRODUCT = PRODUCT_LIST[i];
      const OFFER_ID = CURRENT_PRODUCT.offer_id;
      const PRODUCT_INFO = await this.fetchProductInfo__OneConverted(OFFER_ID);
      PRODUCT_INFO_ARRAY.push(PRODUCT_INFO);
    }
    return PRODUCT_INFO_ARRAY;
  }

  async fetchProductInfo__Array() {
    const PRODUCT_LIST = await this.fetchProductList__All();
    const PRODUCT_INFO_ARRAY = [];
    for (let i = 0; i < PRODUCT_LIST.length; ++i) {
      const CURRENT_PRODUCT = PRODUCT_LIST[i];
      const OFFER_ID = CURRENT_PRODUCT.offer_id;
      const PRODUCT_INFO = await this.fetchJson__OzonSellerProductInfo({
        offer_id: OFFER_ID,
      });
      PRODUCT_INFO_ARRAY.push(PRODUCT_INFO.result);
    }
    return PRODUCT_INFO_ARRAY;
  }

  async fetchProductInfo__OneConverted(offer_id: string) {
    const PRODUCT_INFO = (
      await this.fetchJson__OzonSellerProductInfo({ offer_id: offer_id })
    ).result;
    const RESULT = {
      id: PRODUCT_INFO.id,
      name: PRODUCT_INFO.name,
      offer_id: PRODUCT_INFO.offer_id,
      barcode: PRODUCT_INFO.barcode,
      buybox_price: PRODUCT_INFO.buybox_price,
      category_id: PRODUCT_INFO.category_id,
      created_at: PRODUCT_INFO.created_at,
      images: JSON.stringify(PRODUCT_INFO.images),
      marketing_price: PRODUCT_INFO.marketing_price,
      min_ozon_price: PRODUCT_INFO.min_ozon_price,
      old_price: PRODUCT_INFO.old_price,
      premium_price: PRODUCT_INFO.premium_price,
      price: PRODUCT_INFO.price,
      recommended_price: PRODUCT_INFO.recommended_price,
      min_price: PRODUCT_INFO.min_price,
      sources: JSON.stringify(PRODUCT_INFO.sources),
      stocks__coming: PRODUCT_INFO.stocks?.coming,
      stocks__present: PRODUCT_INFO.stocks?.present,
      stocks__reserved: PRODUCT_INFO.stocks.reserved,
      errors: JSON.stringify(PRODUCT_INFO.errors),
      vat: PRODUCT_INFO.vat,
      visible: PRODUCT_INFO.visible,
      visibility_details__has_price: PRODUCT_INFO.visibility_details?.has_price,
      visibility_details__has_stock: PRODUCT_INFO.visibility_details?.has_stock,
      visibility_details__active_product:
        PRODUCT_INFO.visibility_details?.active_product,
      price_index: PRODUCT_INFO.price_index,

      commissions: JSON.stringify(PRODUCT_INFO.commissions),

      // commissions_fbo__percent: PRODUCT_INFO.commissions?.[0]?.percent,
      // commissions_fbo__min_value: PRODUCT_INFO.commissions?.[0]?.min_value,
      // commissions_fbo__value: PRODUCT_INFO.commissions?.[0]?.value,
      // commissions_fbo__sale_schema: PRODUCT_INFO.commissions?.[0]?.sale_schema,
      // commissions_fbo__delivery_amount:
      //   PRODUCT_INFO.commissions?.[0]?.delivery_amount,
      // commissions_fbo__return_amount:
      //   PRODUCT_INFO.commissions?.[0]?.return_amount,

      // commissions_fbs__percent: PRODUCT_INFO.commissions?.[1]?.percent,
      // commissions_fbs__min_value: PRODUCT_INFO.commissions?.[1]?.min_value,
      // commissions_fbs__value: PRODUCT_INFO.commissions?.[1]?.value,
      // commissions_fbs__sale_schema: PRODUCT_INFO.commissions?.[1]?.sale_schema,
      // commissions_fbs__delivery_amount:
      //   PRODUCT_INFO.commissions?.[1]?.delivery_amount,
      // commissions_fbs__return_amount:
      //   PRODUCT_INFO.commissions?.[1]?.return_amount,

      // commissions_rfbs__percent: PRODUCT_INFO.commissions?.[2]?.percent,
      // commissions_rfbs__min_value: PRODUCT_INFO.commissions?.[2]?.min_value,
      // commissions_rfbs__value: PRODUCT_INFO.commissions?.[2]?.value,
      // commissions_rfbs__sale_schema: PRODUCT_INFO.commissions?.[2]?.sale_schema,
      // commissions_rfbs__delivery_amount:
      //   PRODUCT_INFO.commissions?.[2]?.delivery_amount,
      // commissions_rfbs__return_amount:
      //   PRODUCT_INFO.commissions?.[2]?.return_amount,

      // commissions_fbp__percent: PRODUCT_INFO.commissions?.[3]?.percent,
      // commissions_fbp__min_value: PRODUCT_INFO.commissions?.[3]?.min_value,
      // commissions_fbp__value: PRODUCT_INFO.commissions?.[3]?.value,
      // commissions_fbp__sale_schema: PRODUCT_INFO.commissions?.[3]?.sale_schema,
      // commissions_fbp__delivery_amount:
      //   PRODUCT_INFO.commissions?.[3]?.delivery_amount,
      // commissions_fbp__return_amount:
      //   PRODUCT_INFO.commissions?.[3]?.return_amount,

      volume_weight: PRODUCT_INFO.volume_weight,
      is_prepayment: PRODUCT_INFO.is_prepayment,
      is_prepayment_allowed: PRODUCT_INFO.is_prepayment_allowed,
      images360: JSON.stringify(PRODUCT_INFO.images360),
      color_image: PRODUCT_INFO.color_image,
      primary_image: PRODUCT_INFO.primary_image,
      status: JSON.stringify(PRODUCT_INFO.status),
      // status__state: PRODUCT_INFO.status?.state,
      // status__state_failed: PRODUCT_INFO.status?.state_failed,
      // status__moderate_status: PRODUCT_INFO.status?.moderate_status,
      // status__decline_reasons: PRODUCT_INFO.status?.decline_reasons,
      // status__validation_state: PRODUCT_INFO.status?.validation_state,
      // status__state_name: PRODUCT_INFO.status?.state_name,
      // status__state_description: PRODUCT_INFO.status?.state_description,
      // status__is_failed: PRODUCT_INFO.status?.is_failed,
      // status__is_created: PRODUCT_INFO.status?.is_created,
      // status__state_tooltip: PRODUCT_INFO.status?.state_tooltip,
      // status__item_errors__code: PRODUCT_INFO.status?.item_errors?.code,
      // status__item_errors__field: PRODUCT_INFO.status?.item_errors?.field,
      // status__item_errors__attribute_id:
      //   PRODUCT_INFO.status?.item_errors?.attribute_id,
      // status__item_errors__state: PRODUCT_INFO.status?.item_errors?.state,
      // status__item_errors__level: PRODUCT_INFO.status?.item_errors?.level,
      // status__item_errors__description:
      //   PRODUCT_INFO.status?.item_errors?.description,
      // status__state_updated_at: PRODUCT_INFO.status?.state_updated_at,
      state: PRODUCT_INFO.state,
      service_type: PRODUCT_INFO.service_type,
      fbo_sku: PRODUCT_INFO.fbo_sku,
      fbs_sku: PRODUCT_INFO.fbs_sku,
      currency_code: PRODUCT_INFO.currency_code,
      is_kgt: PRODUCT_INFO.is_kgt,
      discounted_stocks__coming: PRODUCT_INFO.discounted_stocks?.coming,
      discounted_stocks__present: PRODUCT_INFO.discounted_stocks?.present,
      discounted_stocks__reserved: PRODUCT_INFO.discounted_stocks?.reserved,
      is_discounted: PRODUCT_INFO.is_discounted,
      has_discounted_item: PRODUCT_INFO.has_discounted_item,
      barcodes: JSON.stringify(PRODUCT_INFO.barcodes),
      updated_at: PRODUCT_INFO.updated_at,
      price_indexes: JSON.stringify(PRODUCT_INFO.price_indexes),
      // price_indexes__price_index: PRODUCT_INFO.price_indexes?.price_index,
      // price_indexes__external_index_data__minimal_price:
      //   PRODUCT_INFO.price_indexes?.external_index_data?.minimal_price,
      // price_indexes__external_index_data__minimal_price_currency:
      //   PRODUCT_INFO.price_indexes?.external_index_data?.minimal_price_currency,
      // price_indexes__external_index_data__price_index_value:
      //   PRODUCT_INFO.price_indexes?.external_index_data?.price_index_value,
      // price_indexes__ozon_index_data__minimal_price:
      //   PRODUCT_INFO.price_indexes?.ozon_index_data?.minimal_price,
      // price_indexes__ozon_index_data__minimal_price_currency:
      //   PRODUCT_INFO.price_indexes?.ozon_index_data?.minimal_price_currency,
      // price_indexes__ozon_index_data__price_index_value:
      //   PRODUCT_INFO.price_indexes?.ozon_index_data?.price_index_value,
      // price_indexes__self_marketplaces_index_data__minimal_price:
      //   PRODUCT_INFO.price_indexes?.self_marketplaces_index_data?.minimal_price,
      // price_indexes__self_marketplaces_index_data__minimal_price_currency:
      //   PRODUCT_INFO.price_indexes?.self_marketplaces_index_data
      //     ?.minimal_price_currency,
      // price_indexes__self_marketplaces_index_data__price_index_value:
      //   PRODUCT_INFO.price_indexes?.self_marketplaces_index_data
      //     ?.price_index_value,
      sku: PRODUCT_INFO.sku,
      description_category_id: PRODUCT_INFO.description_category_id,
      type_id: PRODUCT_INFO.type_id,
      is_archived: PRODUCT_INFO.is_archived,
      is_autoarchived: PRODUCT_INFO.is_autoarchived,
      _raw_json: JSON.stringify(PRODUCT_INFO),
    };
    return RESULT;
  }

  async fetchJson__OzonSellerProductInfo(
    BODY_JSON: OsonSellerProductInfoBodyJson,
  ) {
    try {
      const URI = `/v2/product/info`;
      const FETCH_URL = `https://api-seller.ozon.ru${URI}`;
      console.log(FETCH_URL, JSON.stringify(BODY_JSON));

      const HEADERS = {
        'Content-Type': 'application/json', // Указываем, что передаем данные в формате JSON
        'Client-Id': this.configService.get<string>('OZON__CLIENT_ID'),
        'Api-Key': this.configService.get<string>('OZON__API_KEY'),
      };

      const RESPONSE = await axios.post(FETCH_URL, BODY_JSON, {
        headers: HEADERS,
      });

      if (RESPONSE.status !== 200) {
        throw new Error(`HTTP status ${RESPONSE.status}`);
      }

      const JSON_: OzonSellerProductInfoResponse = await RESPONSE.data;
      return JSON_;
    } catch (exception) {
      console.error(exception);
      throw exception;
    }
  }
}
