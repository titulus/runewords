$(function() {
	
	issub = function (a,b) {
		if ((typeof a == 'undefined') || (typeof b == 'undefined')) return false;
		
		for (i=0;i<b.length;i++) {
			if (a.indexOf(b[i])==-1) return false;
		};
		return true;
	}
	hasmutual = function (a,b) {
		if ((typeof a == 'undefined') || (typeof b == 'undefined')) return false;
		console.log(a+'\t'+b);
		var length = (a.length > b.length)?a.length:b.length;
		for (i=0;i<=length;i++) {
			if (a.indexOf(b[i])!=-1) return true;
		}
		return false;
	}
	
	//alert([1,2,3],[2,3])
	
	
	$('.item .description').css('left',function(){
		var parent_left = $(this).parent().offset()['left'];
		var left = 0;
		var width = $(this).width();
		
		left = 0 - width/2 + 15;
		if (parent_left+left < 10) {left = 10 - parent_left};
		
		return left+"px";
	});
	$('.rune .description').css('left',function(){
		var parent_left = $(this).parent().offset()['left'];
		var left = 0;
		var width = $(this).width();
		
		left = 0 - width/2 + parent_left + 65;
		if (left < 10) {left = 10};
		
		return left+"px";
	}).css('top',function(){
		var parent_top = $(this).parent().offset()['top'];
		parent_top += 30;
		return parent_top+"px";
	});
	
	$("#runes").selectable({ filter: "li", stop: function(){
		runes = [];
		$.each($("#runes .rune.ui-selected > img"),function(){
			runes.push($(this).attr('alt'));
		});
		console.log('SELECTRUNES');
		console.log(runes);
		showrunewords();
	} });
	$("#items").selectable({ filter: "li", stop: function(){
		items = [];
		$.each($("#items .item.ui-selected"),function(){
			$.each($(this).attr('type').split(','),function(k,v){
				if (items.indexOf(v)==-1) items.push(v);
			});
		});
		console.log('SELECTITEMS');
		console.log(items);
		
		showrunewords();
	} });
	
	$("#runes .rune > img, #items .item > img").hover(function(){$(this).parent().toggleClass('hover');});
	
	showrunewords = function() {
		console.log('SHOWRUNEWORDS.1');
		$("#runewords .runeword").removeClass('runescomplete').removeClass('show');
		console.log('SHOWRUNEWORDS.2');
		$.each($("#runewords .runeword"),function(){
			//console.log($(this).find('.compile').html().split(' ')+'\t'+runes);
			
			if (issub(runes,$(this).find('.compile').html().split(' '))) {$(this).addClass('runescomplete');};
		});
		console.log('SHOWRUNEWORDS.3');
		$.each($("#runewords .runeword.runescomplete"),function(){
			console.log($(this).find('.type').html().split(','));
			if (hasmutual(items,$(this).find('.type').html().split(','))) {$(this).addClass('show');console.log(true);};
		});
		console.log('SHOWRUNEWORDS.4');
		// //$("#runewords .runeword.runescomplete").removeClass('runescomplete');
		// console.log('SHOWRUNEWORDS.5');
	}
	
	var runewords;
	var runes;
	var items;
	
	//$.getJSON('runewords.json',function(data){runewords = data;makerunwords();});
	//$.getJSON('runes.json',function(data){runes = data;makerunes()});
	
	/* // making runes
	makerunes = function() {
		$("#runes").html('');
		$.each(runes,function(i,rune){
			//makerun(rune);
			$("#runes").append(makerun(rune));
		});
	}
	makerun = function(rune) {
		var str = '';
		str += "<li class='rune'>";
		str += 	"<img src='images/rune-"+rune['name']+".png' alt='"+rune['name']+"' />";
		str += 	"<span class='name'>"+rune['name']+"</span>";
		str += 	"<div class='description'>";
		str += 		"<p clas='name'>"+rune['name']+"</p>";
		str += 		"<p clas='effect'><span>Weapon</span>"+rune['weapon']+"</p>";
		str += 		"<p clas='effect'><span>Armor</span>"+rune['etc']+"</p>";
		str += 		"<p clas='lvl'><span>Level required</span>"+rune['lvl']+"</p>";
		str += 	"</div>";
		str += "</li>";
		
		return str;
	}
	*/
	
	/* // making runewords
	makerunwords = function() {
		$("#runewords").html('');
		console.log(runewords);
		$.each(runewords,function(k,v){
				$("#runewords").append(makerunword(v));
		});
	}
	
	makerunword = function(runword) {
		var str = '';
		str += "<li class='runeword'>";
		str += "<div class='name'>"+runword['name']+"</div>";
		str += "<div class='type'>"+runword['type']+"</div>";
		str += "<div class='compile'>"+runword['runes'].join(' ')+"</div>";
		str += "<div class='socket'>socket [<span>"+runword['socket']+"</span>]</div>";
		str += "<div class='effects'>"+runword['effects']+"</div>";
		
		return str;
	}
	*/
	
	console.log('yep');
	
	
});