project = {
		
	initialize : function () {
		
		/* Escondendo os erros nativos do spring validation e criando ícones com title associado ao erro. */
		$('.native-error').each(function (index){
			
			var fieldName = '#' + this.id.replace(/\./g, '\\.');
			
			var dataAlert = $(fieldName).attr("data-alert");
			if(dataAlert != undefined && dataAlert != null && dataAlert != ''){
				$('#' + dataAlert.replace(/\./g, '\\.')).addClass("cerror");
				return;
			}
			
			var fieldName = '#' + this.id.replace(".errors", "").replace(/\./g, '\\.');
			
			$(fieldName).addClass("cerror");
		});
		
		$('.native-error-message').each(function (index){
			
			var fieldName = '#' + this.id.replace(/\./g, '\\.');
			
			var dataAlert = $(fieldName).attr("data-alert");
			if(dataAlert != undefined && dataAlert != null && dataAlert != ''){
				$('#' + dataAlert.replace(/\./g, '\\.')).addClass("cerror");
				return;
			}
			
			var fieldName = '#' + this.id.replace(".errors", "").replace(/\./g, '\\.');
			$(fieldName).addClass("cerror");
		});
		
		$('body').tooltip({
			selector: "a[data-toggle=tooltip]"
		});	
		
		$("[data-toggle=popover]")
	      .popover()
	      .click(function(e) {
	        e.preventDefault();
	    });
		
		this.selectedMenu();
		
		this.applyMasks();
	},
	
	selectedMenu : function () {
		
		/* Remove a propriedade active de todos os itens de navegação */
		$('.nav-sub-menu > li > a, .nav-top-menu > li > a').each(function (index){
			$(this).parent().removeClass("active");	
		});
		
		/* Atribui a propriedade active para todos os links que contiverem o path da URL do browser ou a parte inicial dele */
		$('.nav-sub-menu > li > a, .nav-top-menu > li > a').each(function (){
			if(window.location.pathname.indexOf($(this).attr('href')) > -1)
				$(this).parent().addClass("active");

			if($(this).attr('parentController') && window.location.pathname.indexOf($(this).attr('parentController')) > -1){
				$(this).parent().addClass("active");
			}
		}); 
	},
	
	applyMasks : function () {
		$(".date").mask("99/99/9999");
		$(".areaphone").mask("999");
		$(".cnpj").mask("99.999.999/9999-99");
		$(".empresasitef").mask("99999999"); 
		$(".informantephone").mask("99999999999?9");
		$(".cep").mask("99999999");
		
		$(".real").maskMoney({symbol:"R$",decimal:",",thousands:"."});
	}
};

Number.prototype.toMoney = function(decimals, decimal_sep, thousands_sep)
{ 
   var n = this,
   c = isNaN(decimals) ? 2 : Math.abs(decimals), //if decimal is zero we must take it, it means user does not want to show any decimal
   d = decimal_sep || '.', //if no decimal separator is passed we use the dot as default decimal separator (we MUST use a decimal separator)

   /*
   according to [http://stackoverflow.com/questions/411352/how-best-to-determine-if-an-argument-is-not-sent-to-the-javascript-function]
   the fastest way to check for not defined parameter is to use typeof value === 'undefined' 
   rather than doing value === undefined.
   */   
   t = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep, //if you don't want to use a thousands separator you can pass empty string as thousands_sep value

   sign = (n < 0) ? '-' : '',

   //extracting the absolute value of the integer part of the number and converting to string
   i = parseInt(n = Math.abs(n).toFixed(c)) + '', 

   j = ((j = i.length) > 3) ? j % 3 : 0; 
   return sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : ''); 
};

$(document).ready(function () {
	project.initialize();
});