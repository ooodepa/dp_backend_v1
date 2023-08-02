export default class DateController {
  static getDate__DD_MMMMMM_YYYY(d: Date = new Date()) {
    const dy = d.getFullYear();

    const tdm = d.getMonth() - 1;
    // const dm = tdm < 10 ? `0${tdm}` : `${tdm}`;
    const dm = DateController.getMonth(tdm);

    const tdd = d.getDate();
    const dd = tdd < 10 ? `0${tdd}` : `${tdd}`;

    return `${dd} ${dm} ${dy} г.`;
  }

  static getMonth(m: number) {
    return [
      'января',
      'февраля',
      'марта',
      'апреля',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
    ][m];
  }
}
