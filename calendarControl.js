$(function() {
    let isMouseDown = false;
    let cntrlIsPressed = false;
    let lastNum = 0,
      startWeek = 0,
      endWeek = 0;
  
    $(document)
      .ready(function() {
        $("#cal_save").focus();
      })
      .mouseup(function() {
        isMouseDown = false;
        lastNum = 0;
      })
      .keydown(function(event) {
        if (event.which == "16" || event.which == "17") { // SHIFT key or CTRL key
          cntrlIsPressed = true;
        }
      })
      .keyup(function() {
        cntrlIsPressed = false;
      });
  
    $("#savedDates")
      .click(function() {
        startWeek = 6;
        lastNum = 17;
        endWeek = lastNum;
        highlightFill(lastNum);
      });
  
    $("#calDateType")
      .change(function() {
        $("#calDateDynamic").prop("disabled", $(this).val() != "dynamic");
      });
  
    $("#cal_save")
      .click(function() {
        alert('startWeek is ' + Math.min(startWeek, endWeek) + ' and endWeek is ' + endWeek);
      });
  
    $("#cal_reset")
      .click(function() {
        $("#cal_table td").each(function() {
          $(this).removeClass("highlighted");
          startWeek = 0;
          endWeek = 0;
        });
      });
  
    function highlightFill(week) {
      let isByPeriod = ($("#calSelectBy").val() == "period");
      let starting = (isByPeriod) ?
        startWeek :
        $("#cal_table td:contains('" + startWeek + "')").parent().index();
      let ending = (isByPeriod) ?
        week :
        $("#cal_table td:contains('" + week + "')").parent().index();
  
      $("#cal_table td").each(function() {
        let num = (isByPeriod) ? Number($(this).html()) || 0 : $(this).parent().index();
        if ($(this).index() != 0 && $(this).html() != "") { // valid Period cell 
          if (num > starting) { // this cell is BEFORE the Starting-Cell selection
            if (num >= starting && num <= ending) {
              $(this).addClass("highlighted");
            } else {
              $(this).removeClass("highlighted");
            }
          } else if (num < starting) { // this cell is AFTER the Starting-Cell selection				
            if (num <= starting && num >= ending) {
              $(this).addClass("highlighted");
            } else {
              $(this).removeClass("highlighted");
            }
          } else { // this cell IS the Starting-Cell selection				
            $(this).addClass("highlighted");
          }
        }
      });
    }
  
    $("#cal_selector label")
      .mousedown(function() {
        return false; // prevent text selection
      });

    $("#cal_table")
      .mousedown(function(event) {               
        return false; // prevent text selection
      })
  
    $("#cal_table td")
      .mousedown(function(event) {
        isMouseDown = true;
        lastNum = Number($(this).html()) || 0;
        if (cntrlIsPressed == true) {
          if (startWeek == 0) startWeek = lastNum;
        } else {
          startWeek = lastNum;
        }
        endWeek = lastNum;
        highlightFill(lastNum);
        return false; // prevent text selection
      })
      .mouseover(function() {
        if (isMouseDown) {
          endWeek = Number($(this).html()) || 0;
          highlightFill(endWeek);
        }
      });
  });
  