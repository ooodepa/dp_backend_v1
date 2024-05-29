const months =['января',
'февраля',
'марта',
'апреля',
'мая',
'июня',
'июля',
'августа',
'сентября',
'октября',
'ноября',
'декабря',]

export function date2string_DD_sMM_YYYY(d: Date = new Date()) {
  const DD = `${d.getDate()}`.padStart(2, '0');
  const sMM = months[d.getMonth()];
  const YYYY = d.getFullYear();
  return `${DD} ${sMM} ${YYYY} г.`;
} 
