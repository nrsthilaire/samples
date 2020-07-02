 $("#checkedAll").change(function () {
   if (this.checked) {
     $(".checkParent, .checkChild").each(function () {
       this.checked = true;
     });
   } else {
     $(".checkParent, .checkChild").each(function () {
       this.checked = false;
     });
   }
 });

 $(".checkParent").click(function () {
   if ($(this).is(":checked")) {
     var isAllChecked = 0;
     $(".checkParent").each(function () {
       if (!this.checked)
         isAllChecked = 1;
     })
     $(this).closest("tr").next("tr").find(".checkChild").prop("checked", true);
     if (isAllChecked == 0) {
       $("#checkedAll").prop("checked", true);
     }
   } else {
     $("#checkedAll").prop("checked", false);
     $(this).closest("tr").next("tr").find(".checkChild").prop("checked", false);
   }
 });

 $(".checkChild").click(function () {
   if ($(this).is(":checked")) {

     var isChildChecked = 0;
     $(".checkChild").each(function () {
       if (!this.checked)
         isChildChecked = 1;
     });
     if (isChildChecked == 0) {
       $("#checkedAll").prop("checked", true);
     }
     $(this).closest("table").closest("tr").prev("tr").find(".checkParent").prop("checked", true);

   } else {
     var isAllSiblingChecked = 0;
     $(this).closest("tr").nextAll("tr").find(".checkChild").each(function () {
       if ($(this).is(":checked"))
         isAllSiblingChecked = 1;
     });

     $(this).closest("tr").prev("tr").find(".checkChild").each(function () {
       if ($(this).is(":checked"))
         isAllSiblingChecked = 1;
     });

     if (isAllSiblingChecked == 0) {
       $(this).closest("table").closest("tr").prev("tr").find(".checkParent").prop("checked", false);
     }
     $("#checkedAll").prop("checked", false);
   }
 });