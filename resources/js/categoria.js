$(document).ready(function () {

	var catCorrente = $('#categoriaCorrente').val();
	catCorrente = catCorrente.replace('.','\\.');
	var idCorrente = catCorrente.replace('temp', '').replace('\\.descricao','');
	
	categoria.currentCat = parseInt($('#ncat'+idCorrente).val() - 1);	
});

categoria = {
	
	currentNome: null,
	
	currentNomeItem: null,
		
	currentCat : null,		
	
	addCategoria : function (id) {
		
		if($('#temp'+id+'\\.id').val() == '')
			return;
		
		this.currentCat = parseInt($('#ncat'+id).val() - 1);
		
		this.currentCat++;			
		
		var copy = '<div class="controls">'+
						'<input id="mapeamento'+id+'.categoriaVpsa'+this.currentCat+'.id" name="mapeamento['+id+'].categoriaVpsa['+this.currentCat+'].id" class="categoriaMap'+id+'"  type="hidden" value="'+$('#temp'+id+'\\.id').val()+'">'+
						'<input id="mapeamento'+id+'.categoriaVpsa'+this.currentCat+'.id" name="mapeamento['+id+'].categoriaVpsa['+this.currentCat+'].id" class="categoriaMap'+id+'"  type="hidden" value="'+$('#temp'+id+'\\.id').val()+'">'+
						'<input id="mapeamento'+id+'.categoriaVpsa'+this.currentCat+'.nome" name="mapeamento['+id+'].categoriaVpsa['+this.currentCat+'].nome" class="span3" readonly="readonly" type="text" value="'+$('#temp'+id+'\\.descricao').val()+'"> '+
						'<button type="button" id="delcategoria'+id+'" class="btn" onclick="categoria.removeCategoria('+id+','+this.currentCat+');"><i class="icon-minus"></i></button>'+
					'</div>';

		$("#categoria"+id).append(copy);		
		
		$('#temp'+id+'\\.id').val("");
		$('#temp'+id+'\\.descricao').val("");		
		
		$('#ncat'+id).val(this.currentCat + 1);
		
	},	
	
	removeCategoria : function (id, cat) {
		
		this.currentCat = parseInt($('#ncat'+id).val() - 1);
		
		for(x=cat; x<this.currentCat; x++){
			var copy = '<input id="mapeamento'+id+'.categoriaVpsa'+x+'.id" class="categoriaMap'+id+'" name="mapeamento['+id+'].categoriaVpsa['+x+'].id" 									type="hidden"   value="'+$('#mapeamento'+id+'\\.categoriaVpsa'+(x+1)+'\\.id').val()+'">'+
				'<input 	   id="mapeamento'+id+'.categoriaVpsa'+x+'.nome" 						  name="mapeamento['+id+'].categoriaVpsa['+x+'].nome" class="span3" readonly="readonly" type="text" 	value="'+$('#mapeamento'+id+'\\.categoriaVpsa'+(x+1)+'\\.nome').val()+'"> '+
				'<button type="button" id="delcategoria'+id+'" class="btn" onclick="categoria.removeCategoria('+id+','+x+');"><i class="icon-minus"></i></button>';
			
			$("#categoria"+id).find('.controls').get(x + 1).innerHTML = copy;
				
		}	
		
		$("#categoria"+id).find('.controls').get(this.currentCat+1).remove();		
		
		this.currentCat--;
		
		$('#ncat'+id).val(this.currentCat + 1);
	},
};