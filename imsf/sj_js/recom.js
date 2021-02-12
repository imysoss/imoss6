
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


function PlayEPSelect(){
  var loc_href = window.location.href;
  var re_resl = loc_href.match(/\/play\/(.+?)-(\d+)-(\d+)/);
  if(re_resl){
    var epIdx = Number(re_resl[3]);
    $(".stui-content__playlist li:nth-child("+(epIdx+1)+")").addClass("active");
  } 
  return;
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


//////////////////

function __play_ep_scroll(){
  const _href_url = window.location.href;
  const _refresl = _href_url.match(/\/play\/(.+?)-(\d+?)-(\d+?)\.html/);
  const _iEP = Number(_refresl[3]);

  //
  const _sel_lis = $('div.re-play-eplist ul li');
  const _ep0_pos = _sel_lis[0].offsetTop;
  const _ep_pos = _sel_lis[_iEP].offsetTop;
  $("div.re-play-eplist ul").scrollTop(_ep_pos - _ep0_pos);
  
  //
  const __t_sel_ep = 'div.re-play-eplist ul li:nth-child(' + (_iEP + 1) + ')';

}


function __active_header_menu(){
  var pds = ["电影", "电视剧", "综艺", "动漫"];
  var pd = $("#re-pindao-text").text();
  for (var i = 0; i < pds.length; i++){
    if(pds[i] == pd){
      $(".stui-header__menu>li:nth-child("+(i+3)+")").addClass("active");
    }
  }
}

