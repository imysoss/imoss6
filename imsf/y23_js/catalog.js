


function __get_catalog_href(in_curr_url, line_index, in_value){
    var re_resl = in_curr_url.match(/(\/catalog\/)(.+?)(\.html)/);
    if(!re_resl){
        alert("catalog.js if(!re_resl){");
        return null;
    }
  
    var lab_spl = re_resl[2].split('-');
    if(lab_spl.length != 10){
        alert("catalog.js if(lab_spl.length != 10){");
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
    
    var html_dt = '<li><span class="text-muted">按{0}</span></li>';
    html_dt = html_dt.replace('{0}', in_labels[1]);
    var html_href_s = '';
    for (var i = 2; i < in_labels.length; i++){
        var hf_resl = __get_catalog_href(curr_url, line_index, in_labels[i]);
  
        var a_href = '<li class="{0}"><a href="{1}" title="{2}">{2}</a></li>';
        a_href = a_href.replace(/\{0\}/g, (hf_resl[1] ? 'active' : ''));
        a_href = a_href.replace(/\{1\}/g, hf_resl[0]);
        a_href = a_href.replace(/\{2\}/g, in_labels[i]);
  
        html_href_s += a_href;
    }

    var html_resl = '<ul class="stui-screen__list type-slide bottom-line-dot clearfix">{0}</ul>';
    html_resl = html_resl.replace('{0}', (html_dt + html_href_s));
    document.write(html_resl);
  }
  
  
  function __write_catalog_table(){
    const curr_url = window.location.href;
  
    __write_catalog_sub(PinDao, curr_url, 0);
  
    __write_catalog_sub(DiQu, curr_url, 1);
  
    __write_catalog_sub(NianDai, curr_url, 2);
  
    __write_catalog_sub(LeiXing, curr_url, 3);
  
  
  }
  
  
  //////////////////
  
  function __make_catalog2_sort(){
    const curr_url = window.location.href;
    var re_resl = curr_url.match(/(\/catalog\/)(.+?)(\.html)/);
    var lab_spl = re_resl[2].split('-');
    const lab_len = 10;
    if(lab_spl.length != lab_len){
      alert('if(lab_spl.length != lab_len){');
      return null;
    }
  
    //
    var sort_index = Number(lab_spl[7]);
    var html_str = "";
    var title_s = ["按时间", "按人气"];
    for (var i = 0; i < title_s.length; i++){
      lab_spl[7] = i;
      var m_href = (re_resl[1] + lab_spl.join('-') + re_resl[3]);
      //
      var btn_status = "";
      if(i == sort_index){
        btn_status = "active";
      }
      //
      var m_html = '<li class=" {1}"><a href="{0}">{2}</a></li>';
      m_html = m_html.replace("{0}", m_href);
      m_html = m_html.replace("{1}", btn_status);
      m_html = m_html.replace("{2}", title_s[i]);
      html_str += m_html;
    }
    document.write(html_str);
  }
  
  
  /////////////////////
  
  function __make_m_catalog2_scroll(){
    $(".re-catalog-table .stui-screen__list").each(function(){
      const ep0_pos = $(this).children("li")[0].offsetLeft;
      const ep1_pos = $(this).children("li")[2].offsetLeft;
      const ep_pos = $(this).find("li.active")[0].offsetLeft;
      $(this).scrollLeft(ep_pos - ep0_pos - ep1_pos);
    });
  }
  
  
  