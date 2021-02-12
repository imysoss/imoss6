



/////////////////////////////

function PlayEPSelect(){
  var loc_href = window.location.href;
  var re_resl = loc_href.match(/\/play\/(.+?)-(\d+)-(\d+)/);
  if(re_resl){
    var epIdx = Number(re_resl[3]);
    $(".ff-playurl-dropdown .ff-playurl li:nth-child("+(epIdx+1)+")").addClass("active");
  } 
  return;
}


function __play_ep_scroll(){
  const _href_url = window.location.href;
  const _refresl = _href_url.match(/\/play\/(.+?)-(\d+?)-(\d+?)\.html/);
  const _iEP = Number(_refresl[3]);

  //
  const _sel_lis = $('.ff-playurl-pp li');
  const _ep0_pos = _sel_lis[0].offsetTop;
  const _ep_pos = _sel_lis[_iEP].offsetTop;
  $(".ff-playurl-pp").scrollTop(_ep_pos - _ep0_pos);
  
  //
  const __t_sel_ep = '.ff-playurl-pp li:nth-child(' + (_iEP + 1) + ')';

}

function XunleiDlInit(){
  var thl_cnt = 0;
  $(".thunder-link").each(function(){
    var m_href = encodeURI($(this).attr("href"));
    var xl_href = "thunder://" + window.btoa("AA"+m_href+"ZZ");
    $(this).attr("href", xl_href);
    thl_cnt++;
  });
  if(!thl_cnt){
    $(".re-xunlei").attr("hidden", "hidden");
  }

  //
  $(".re-mox #allcheck1").click(function(){
    if ($(this).is(":checked")) {
      $(".re-mox li i input").each(function(){
        $(this).prop("checked", true);
      })
    } else {
      $(".re-mox li i input").each(function(){
        $(this).prop("checked", false);
      })
    }
  });
}

function m_XunleiDlInit(){
  var thl_len = $(".thunder-link").length;
  if(!thl_len){
    $(".re-xunlei").css("display", "none");
    $(".vod-detail .nav-tabs>li").css("width", "49.9%");
  }
}

function CopyToClip(str){
  var save = function (e){
      e.clipboardData.setData('text/plain',str);//下面会说到clipboardData对象
      e.preventDefault();//阻止默认行为
  }
  document.addEventListener('copy',save);
  document.execCommand("copy");//使文档处于可编辑状态，否则无效
}

function XunleiCopyToClip(){
  var cli_str = "";
  var cli_cnt = 0;

  //
  var t_sel_ul = ".re-mox .downlist ul";
  var sel_li_s = $(t_sel_ul).children("li");
  for (var i = 0; i < sel_li_s.length; i++){
    var sel_li = $(t_sel_ul).children("li:nth-child("+(i+1)+")");
    if(sel_li.find("i input").is(":checked")){
      var m_href = sel_li.find("a.dloc").attr("href");
      if(m_href){
        cli_str += m_href;
        cli_str += "\r\n";
        cli_cnt++;
      }
    }
  }
  CopyToClip(cli_str);
  alert("已复制"+cli_cnt+"个链接");
}

function onclick_view_1234(in_index){
  switch(in_index){
    case 0:
      alert("ヾ(≧O≦)〃嗷~");
      break;
    case 1:
      alert("Σ( ° △ °|||)︴");
      break;
    case 2:
      alert("(๑•̀ㅂ•́)و✧");
      break;
    case 3:
      alert("ヾ(≧▽≦*)o");
      break;     
  }
}

function onclick_updown(up_num, down_num){
  var r_url = "/updown?up_num={0}&down_num={1}&from={2}";
  r_url = r_url.replace("{0}", up_num);
  r_url = r_url.replace("{1}", down_num);
  r_url = r_url.replace("{2}", encodeURIComponent(window.location.href));

  $.getJSON(r_url, "", function(result){
    $(".glyphicon-thumbs-up + .ff-updown-val").text(result.up_num);
    $(".glyphicon-thumbs-down + .ff-updown-val").text(result.down_num);
    if(result.msg){
      alert(result.msg);
    }
  });
}

function onclick_sendcomment(){
  alert("模块已禁用！");
}

function onclick_report(urlpath){
  alert("模块已禁用，URL：" + urlpath);
}


//////////////////////////////////////


function GetCookie(name){
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg)){
    return (decodeURIComponent(arr[2]));
  }else{
    return "";
  }
}

function SetCookie(name, value, in_days){
  var exp = new Date();
  exp.setTime(exp.getTime() + in_days*24*60*60*1000);
  document.cookie = name + "="+ encodeURIComponent(value) + ";expires=" + exp.toGMTString() + ";path=/";
}

function Trim(in_str, in_sub){
  in_sub = in_sub.replace(/\[/g, "\\[");
  in_sub = in_sub.replace(/\]/g, "\\]");
  var reg = new RegExp("(^["+in_sub+"]*)|(["+in_sub+"]*$)", "g");
  return in_str.replace(reg, "");
}

function GetUrlPath(){
  var re_resl = window.location.href.match(/\/\/[^/]+(.*)/)
  if(re_resl){
    return re_resl[1];
  }
  return null;
}

function TimeCycle(time){
  var unixtime = time;
  var unixTimestamp = new Date(unixtime * 1000);
  var date_s = [];
  date_s.push(""+unixTimestamp.getFullYear());
  date_s.push(""+(unixTimestamp.getMonth()+1));
  date_s.push(""+unixTimestamp.getDate());
  date_s.push(""+unixTimestamp.getHours());
  date_s.push(""+unixTimestamp.getMinutes());
  date_s.push(""+unixTimestamp.getSeconds());
  for (var i = 0; i < date_s.length; i++){
    if(date_s[i].length == 1){
      date_s[i] = ("0"+date_s[i]);
    }
  }
  var toDay = (date_s.slice(0,3).join("-") + " " + date_s.slice(3,6).join(":"));
  return toDay;
}

function GetRecordString(){
  var main_title = Trim($(".re-main-title-text").prop("firstChild").nodeValue, " \r\n");
  var ep_title = Trim($(".re-ep-title-text").prop("firstChild").nodeValue, " \r\n");
  var urlpath = GetUrlPath();
  urlpath = urlpath.replace(/\?.*/g, "");
  var r_time = (new Date().getTime() / 1000);
  var resl_str = [main_title, ep_title, urlpath, r_time].join("{|}") + "{||}";
  return resl_str;
}

function PlayRecordLimit(in_record, maxcnt){
  var rec_spls = in_record.split("{||}");
  if(rec_spls.length <= (maxcnt+1)){
    return in_record;
  }
  return rec_spls.slice(0, maxcnt).join("{||}") + "{||}";
}

function RemovRecord(src_record, new_record){
  var m_new_spl = new_record.split("{|}");
  var src_record_spl = src_record.split("{||}");
  if(src_record_spl){
    var src_record_new_spl = [];
    for (var i = 0; i < src_record_spl.length; i++){
      var m_spl = src_record_spl[i].split("{|}");
      if(m_spl[0] == m_new_spl[0] && m_spl[1] == m_new_spl[1]){
        //
      }else {
        src_record_new_spl.push(src_record_spl[i]);
      }
    }
    src_record = src_record_new_spl.join("{||}") + "{||}";
  }
  return src_record;
}

function SetPlayRecord(){
  var ck_name = "play_record";
  var new_record = GetRecordString();
  var src_record = new_record + RemovRecord(GetCookie(ck_name), new_record);
  src_record = PlayRecordLimit(src_record, 20);
  SetCookie(ck_name, src_record, 3600);
}

function __s_WritePlayRecord(bTime){
  var play_record = GetCookie("play_record");
  var rec_spls = play_record.split("{||}");
  var html_str = "";
  for (var i = 0; i < rec_spls.length; i++){
    if(rec_spls[i]){
      rec_spl_sub_S = rec_spls[i].split("{|}")
      if(rec_spl_sub_S.length == 4){
        var t_time = (bTime ? TimeCycle(rec_spl_sub_S[3]) : "");
        var m_html = '<li><a target="_self" href="{0}">{1} - <span class="ep-title">{2}</span></a><span class="rec-time">{3}</span></li>';
        m_html = m_html.replace("{0}", rec_spl_sub_S[2]);
        m_html = m_html.replace("{1}", rec_spl_sub_S[0]);
        m_html = m_html.replace("{2}", rec_spl_sub_S[1]);
        m_html = m_html.replace("{3}", t_time);
        html_str += m_html;
      }
    }
  }
  document.write(html_str);
}

function WritePlayRecord(){
  return __s_WritePlayRecord(true);
}

function m_WritePlayRecord(){
  return __s_WritePlayRecord(false);
}


//////////////////////////////////////////////

const __g_exXP = [''];
var __g_isfullscn = false;
var __g_new_playleft_id = null;
var __margin_bak = '';


function __playfull_set(_in_id, _in_title_on, _in_exXP){
  if (!navigator.userAgent.match(/(iPhone|iPod|Android|mobile|blackberry|webos|incognito|webmate|bada|nokia|lg|ucweb|skyfire)/i)) {
    $('#'+_in_id).append('<a class="fullscn' + _in_exXP + '">' + _in_title_on + '</a>');
    
    //
    if(!__g_isfullscn || !_in_exXP){
      $((".fullscn" + _in_exXP)).show();
    }

    //
    $('#'+_in_id).mouseover(function() {
      if(!__g_isfullscn || !_in_exXP){
        $((".fullscn" + _in_exXP)).show();
      }
    }).mouseout(function() {
      $((".fullscn" + _in_exXP)).hide()
    });

    //
    $((".fullscn" + _in_exXP)).click(function() {
      if(!__g_isfullscn){
        $((".fullscn" + '')).html('还原窗口');
        //
        const _new_ID = ("fullplayleft" + _in_exXP);
        $('#'+_in_id + ' iframe').css('width', '100%');
        $('#'+_in_id + ' iframe').css('height', '100%');
        __margin_bak = $('#'+_in_id + ' iframe').css('margin');
        $('#'+_in_id + ' iframe').css('margin', '0px');
        $('#'+_in_id).attr("id", _new_ID);

        //
        __g_new_playleft_id = _new_ID;

        //
        __g_isfullscn = true;
      }
      else {
        $((".fullscn" + '')).html(_in_title_on);
        $('#'+_in_id + ' iframe').css('margin', __margin_bak);
        $(('#' + __g_new_playleft_id)).attr("id", _in_id);

        //
        __g_isfullscn = false;
      }
    });
  };
}

function __exp_playfull_set(_in_id){
  for (var i = 0; i < __g_exXP.length; i++){
    const p1 = (__g_exXP[i] ? ('网页' + __g_exXP[i] + 'P') : '网页全屏');
    const p2 = (__g_exXP[i] ? ('-' + __g_exXP[i] + 'p') : '');
    __playfull_set(_in_id, p1, p2);
  }
}


