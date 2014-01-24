$(document).ready(function () {

	consulta.currentEnt = parseInt($('#nent').val() - 1);	
	consulta.currentNome = $('#nNome').val();
});

consulta = {
	
	currentNome: null,
	
	currentEnt : null,		
	
	add : function () {
		
		if($('#tempSku').val() == '')
			return;
		
		this.currentEnt++;			
		
		var copy = '<div class="controls">'+						
						'<input id="'+this.currentNome+''+this.currentEnt+'" name="'+this.currentNome+'['+this.currentEnt+']" class="span3 sku" readonly="readonly" type="text" value="'+$('#tempSku').val()+'"> '+
						'<button type="button" id="del'+this.currentEnt+'" class="btn" onclick="consulta.remove('+this.currentEnt+');"><i class="icon-minus"></i></button>'+
					'</div>';

		$("#"+this.currentNome).append(copy);		
		
		$('#tempSku').val("");
	},	
	
	remove : function (idx) {
				
		var cNome = this.currentNome;
		
		$("#"+cNome).find('.controls').get(idx + 1).remove();		
		
		this.currentEnt--;
		
		var re1 = new RegExp(cNome+"\\[[0-9]+\\]", 'gi');
		var re2 = new RegExp(cNome+"[0-9]+", 'gi');
		
		$("#"+cNome).find('.controls').each(function(index, value){

			if(index <= idx)
				return;
			
			copy = $(value).html();
			copy = copy.replace(re1, cNome+'[' + (index - 1) + ']');
			copy = copy.replace(re2, cNome+ (index - 1));
			copy = copy.replace(/del[0-9]+/gi, 'del' + (index - 1));
			copy = copy.replace(/remove\([0-9]+\)/gi, 'remove(' + (index - 1) + ')');
			
			$(value).html(copy);
		});		
	},
	
	validarForm : function () {
		
		if($('#tempSku').val() != ""){
			
			$("#modalEntAlert").modal();
			
			return false;
		}
		
		return true;
	},
	
	ignoreEntAndContinue : function () {
		$('#tempSku').val("");
		$('#consultaLogFilter').submit();
	}
};