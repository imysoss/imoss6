


function __get_catalog_href(in_curr_url, line_index, in_value){
  var re_resl = in_curr_url.match(/(\/v\/type\/)(.+?)(\.html)/);
  if(!re_resl){
      alert("s_type.js if(!re_resl){");
      return null;
  }

  var lab_spl = re_resl[2].split('-');
  if(lab_spl.length != 10){
      alert("s_type.js if(lab_spl.length != 10){");
      return null;
  }

  var in_value2 = (in_value == '全部' ? '' : in_value);
  var r_resl = ['', false];
  if(decodeURIComponent(lab_spl[line_index]) == in_value2){
      r_resl[1] = true;
  }

  //
  lab_spl[8] = "0"; // pageindex = 0;
  
  //
  lab_spl[line_index] = encodeURIComponent(in_value2);
  var hf_href = (re_resl[1] + lab_spl.join('-') + re_resl[3]);
  r_resl[0] = hf_href;
  return r_resl;
}

function __write_catalog_sub(in_labels, curr_url, line_index){
  
  var html_dt = ('<dt>' + in_labels[1] + '：</dt>');
  var html_dd = '<dd class="text-nowrap ff-gallery re-type-dd">{0}</dd>'
  var html_href_s = '';
  for (var i = 2; i < in_labels.length; i++){
      var hf_resl = __get_catalog_href(curr_url, line_index, in_labels[i]);

      var a_href = '<a href="{0}" class="btn btn-sm btn-default gallery-cell {1}">{2}</a>';
      a_href = a_href.replace('{0}', hf_resl[0]);
      a_href = a_href.replace('{1}', (hf_resl[1] ? 'btn-success gallery-active' : ''));
      a_href = a_href.replace('{2}', in_labels[i]);

      html_href_s += a_href;
  }
  html_dd = html_dd.replace('{0}', html_href_s);

  var html_resl = (html_dt + html_dd);

  document.write(html_resl);
}


(function __write_catalog_table(){
  const curr_url = window.location.href;

  __write_catalog_sub(PinDao, curr_url, 0);

  __write_catalog_sub(DiQu, curr_url, 1);

  __write_catalog_sub(NianDai, curr_url, 2);

  __write_catalog_sub(LeiXing, curr_url, 3);


})();


//////////////////

function __make_catalog2(){
  const curr_url = window.location.href;
  var re_resl = curr_url.match(/[?&]+sid_s=([^&]*)/);
  if(re_resl){
    return null;
  }
  //
  var re_resl = curr_url.match(/(\/v\/type\/)(.+?)(\.html)/);
  var lab_spl = re_resl[2].split('-');
  const lab_len = 10;
  if(lab_spl.length != lab_len){
    alert('if(lab_spl.length != lab_len){');
    return null;
  }
  //
  var re_str = ".+";
  for (var i = 0; i < (lab_spl.length-3); i++){
    var m_lab = lab_spl[i];
    if(m_lab){
      re_str += (".*?\\|" + decodeURIComponent(m_lab) + "#");
    }
  }
  const catalog_s = CATALOG_S;
  var re = new RegExp(re_str, "g");
  var r_resl2 = [];
  var m_resl = undefined;
  while (m_resl = re.exec(catalog_s)){
    r_resl2.push(m_resl[0]);
  }

  //
  var pageIndex = Number(lab_spl[lab_len-2]);
  var pageSize = Number(lab_spl[lab_len-1]);
  var pageAll = r_resl2.length;

  //
  var iBegin = (pageIndex * pageSize);
  if(iBegin >= pageAll){
    return null;
  }
  var iEndp = (iBegin + pageSize);
  if(iEndp > pageAll){
    iEndp = pageAll;
  }
  //
  var sid_s = r_resl2.slice(iBegin, iEndp);
  for (var i = 0; i < sid_s.length; i++){
    sid_s[i] = sid_s[i].split("|")[0];
  }
  //
  var xup = '?';
  if(curr_url.indexOf(xup) > 0){
    xup = '&';
  }
  var r_url = (curr_url + xup + "pageall=" + pageAll + "&sid_s=" + sid_s.join('-'));
  return r_url;
}

function __make_catalog2_sort(){
  const curr_url = window.location.href;
  var re_resl = curr_url.match(/(\/v\/type\/)(.+?)(\.html)/);
  var lab_spl = re_resl[2].split('-');
  const lab_len = 10;
  if(lab_spl.length != lab_len){
    alert('if(lab_spl.length != lab_len){');
    return null;
  }

  //
  var sort_index = Number(lab_spl[7]);
  var html_str = "";
  var title_s = ["最新上映", "最近热播", "评分最高"];
  for (var i = 0; i < title_s.length; i++){
    lab_spl[7] = i;
    var m_href = (re_resl[1] + lab_spl.join('-') + re_resl[3]);
    //
    var btn_status = "btn-default";
    if(i == sort_index){
      btn_status = "btn-success";
    }
    //
    var m_html = '<a href="{0}" class="btn {1}">{2}</a>';
    m_html = m_html.replace("{0}", m_href);
    m_html = m_html.replace("{1}", btn_status);
    m_html = m_html.replace("{2}", title_s[i]);
    html_str += m_html;
  }
  document.write(html_str);
}


/////////////////////

function __make_m_catalog2_scroll(){
  $(".re-type-dd").each(function(){
    const ep0_pos = $(this).children("a")[0].offsetLeft;
    const ep1_pos = $(this).children("a")[1].offsetLeft;
    const ep_pos = $(this).find("a.btn-success")[0].offsetLeft;
    $(this).scrollLeft(ep_pos - ep0_pos - ep1_pos);
  });
}


