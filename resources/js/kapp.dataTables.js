/*
    Requer: jquery.datatable.js
*/

(function ($) {

    var defaults = {
        "MultiRowSelection": true,
        "trClickCallback" : function () { },
        "sortColumn" : 0,
        "sortOrder" : "asc",
        "sAjaxSource" : null,
        "fnServerData" : null,
        "aoColumnDefs" : null,
        "bProcessing": false,
        "bServerSide": false,
        "bFilter": true,
        "bPaginate": true,
        "bInfo": true,
        "iDisplayLength": 10,
        "aLengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "fnFooterCallback" : function () { }
    };

    var settings, selector, oTable, shiftHeld = false;
    var lastIndexSelected;

    $.fn.kappDataTable = function (options) {

        if (options) {
            settings = $.extend({}, defaults, options);
        }

        selector = this.selector;

        if (settings.MultiRowSelection) {
            $(selector).find('tbody tr').click(function (event) {
                if ($(this).hasClass('row_selected')){
                	if (event.ctrlKey == 1) {
                		$(this).removeClass('row_selected');   
                        lastIndexSelected = null;                 
                	}
                	else {
                		$(oTable.fnSettings().aoData).each(function () {
                            $(this.nTr).removeClass('row_selected');
                        });
                		$(this).addClass('row_selected');                        
                        lastIndexSelected = $(this).index();                		
                	}
                }
                else {
                	if(!event.ctrlKey == 1 && !event.shiftKey == 1) {
                		$(oTable.fnSettings().aoData).each(function () {
                            $(this.nTr).removeClass('row_selected');
                        });         
                        lastIndexSelected = null;
                	}
                	var done = false;
                	if (event.shiftKey == 1) {
                		event.preventDefault();
                		if(lastIndexSelected != null) {
                			if(lastIndexSelected < $(this).index())
                				$(this).parent().children().slice(lastIndexSelected, $(this).index() + 1).addClass('row_selected');
                			else
                				$(this).parent().children().slice($(this).index(), lastIndexSelected).addClass('row_selected');   
                			done = true;
                			window.getSelection().removeAllRanges();
                		}
                	}
                	if(!done)
                		$(this).addClass('row_selected');
                    lastIndexSelected = $(this).index();
                }                
            });
        }
        else {
            $(selector).find('tbody tr').click(function () {
                if ($(this).hasClass('row_selected')){
                    $(this).removeClass('row_selected');
                }
                else {
                    $(oTable.fnSettings().aoData).each(function () {
                        $(this.nTr).removeClass('row_selected');
                    });
                    $(this).addClass('row_selected');
                }
            });
        }
        
        $(selector).find('tbody tr').click(function () {        	
        	settings.trClickCallback();
        });

        oTable = $(selector).dataTable(
        {
            "bDestroy": true,
            "sAjaxSource" : settings.sAjaxSource,
            "fnServerData" : settings.fnServerData,
            "aoColumnDefs" : settings.aoColumnDefs,
            "bProcessing": settings.bProcessing,
            "bServerSide": settings.bServerSide,
            "bFilter": settings.bFilter,
            "bPaginate": settings.bPaginate,
            "bInfo": settings.bInfo,
            "iDisplayLength" : settings.iDisplayLength,
            "fnFooterCallback" : settings.fnFooterCallback
        });
        
        oTable.fnSort( [ [settings.sortColumn, settings.sortOrder] ] );

        return $.fn.kappDataTable;
    };
    
    $.fn.kappDataTable.fnFilter = function (value, index) {
        oTable.fnFilter(value, index);
    };

    $.fn.kappDataTable.UnselectAll = function () {
        $(oTable.fnSettings().aoData).each(function () {
            $(this.nTr).removeClass('row_selected');
        });
    };
    
    $.fn.kappDataTable.destroy = function (value, index) {
        oTable.fnDestroy();
    };

    $.fn.kappDataTable.ClearTable = function () {
        oTable.fnClearTable(this);
        $(selector).find('tbody').empty();
    };

    $.fn.kappDataTable.Selected = function () {

        objects = new Array();
        
        $(oTable.fnSettings().aoData).each(function () {
        	
            if($(this.nTr).hasClass('row_selected')){
            	
            	obj = null;

            	$(this.nTr).find('td').each(function () {

                    propertyName = $(this).attr("oName");
                    propertyValue = $(this).attr("oValue");
                    
                    if (propertyName != undefined && propertyName != null && propertyValue != undefined && propertyValue != null) {

                        if (obj == null)
                            obj = new Object();

                        eval("obj." + propertyName + "='" + propertyValue + "'");
                    }
                });

                if (obj != null)
                    objects.push(obj);
            	
            }
        });
        
        return objects;
    };
	
	$.fn.kappDataTable.SelectedRows = function () {

        objects = new Array();
        
        $(oTable.fnSettings().aoData).each(function () {        	
            if($(this.nTr).hasClass('row_selected'))            	
            	objects.push($(this.nTr));
        });
        
        return objects;
    };

})(jQuery);