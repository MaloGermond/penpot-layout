import {RulerGuide} from "@penpot/plugin-types";

penpot.ui.open("Penpot plugin starter template", `?theme=${penpot.theme}`);

penpot.ui.onMessage<string>((message) => {
  console.log({message});
  const selection = penpot.selection
  const page = penpot.currentPage;
  // Vérifiez si `page` n'est pas `null` avant d'accéder à ses propriétés

  if (message === "create-guides") {
    if(page === null){
      console.error("page not found");
      return;
    }

    const guides = page.rulerGuides;
    console.log(guides)

    if(selection.length > 0) {
      selection.map(el=>{
        const x = el.x;
        const y = el.y;
        const w = el.width;
        const h = el.height;

        // Fonction pour vérifier si un guide existe déjà à une position donnée
        const guideExists = (orientation, position) => {
          return page.rulerGuides.some(guide => guide.orientation === orientation && guide.position === position);
        };

        // Ajouter les guides uniquement s'ils n'existent pas déjà
        if (!guideExists("horizontal", y)) {
          page.addRulerGuide("horizontal", y);
        }
        if (!guideExists("horizontal", y + h)) {
          page.addRulerGuide("horizontal", y + h);
        }
        if (!guideExists("vertical", x)) {
          page.addRulerGuide("vertical", x);
        }
        if (!guideExists("vertical", x + w)) {
          page.addRulerGuide("vertical", x + w);
        }
      })
    }
  }
  if (message === "clear-guides") {
    if(page === null){
      console.error("page not found");
      return;
    }
    const guides = page.rulerGuides;

    if (page && guides.length > 0) {
      guides.map(el => page.removeRulerGuide(el))
    }
  }

  if(message === "fill-horizontal" || "fill-vertical" || "fill-both" && selection.length > 0) {
    const horizontal: boolean = message === "fill-horizontal" || message === "fill-both";
    const vertical: boolean = message === "fill-vertical" || message === "fill-both";

    selection.map(el=>{
      if(el.type === "board"){
        const childs= el.getChildren()

        childs.map(item=>{
          horizontal ? item.layoutChild.horizontalSizing = "fill" : null
          vertical ? item.layoutChild.verticalSizing = "fill" : null
        })
      }
      if(el.layoutChild != null){
        horizontal ? el.layoutChild.horizontalSizing = "fill":null
        vertical ? el.layoutChild.verticalSizing = "fill":null
      }
    })

  }

    /*
    // Crée un flex layout dans le cas ou il n'existe pas.

    const board = penpot.createBoard();

    selection.map(el=>{board.appendChild(el)})

    // Then you can add the flexLayout to it
    const flex = board.addFlexLayout();
    board.horizontalSizing = "auto";
    board.verticalSizing = "auto";


    // We can choose whether to go right or left with "row" or "row-reverse", or up or down with "column" or "column-reverse". The default is null.
    flex.dir = "column";

    // Next, we can decide the wrapping behaviour ("wrap" | "nowrap"). The default setting for this property is "undefined".
    flex.wrap = "wrap";

    // Let's align the items. These are the options: "start" | "end" | "center" | "stretch";
    flex.alignItems = "center";
    // and also we can align the content. These are the options "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly" | "stretch";
    flex.justifyContent = "center";

    // We can set up a padding
    flex.verticalPadding = 5;
    flex.horizontalPadding = 5;

    // We can choose how big the container is going to be, both horizontally and vertically. These are the options: "auto" | "fill" | "fix";
    flex.horizontalSizing = "fill";
    flex.verticalSizing = "fill";
  */

  if (message === "invert-colors") {

    const fills = selection[0].fills
    const strokes = selection[0].strokes

    console.log(fills)
    console.log(strokes)

    selection[0].strokes = fills.map((color,index) => {

      if(!color.fillColor){
        return {strokeOpacity: color.fillOpacity, strokeStyle: 'solid', strokeWidth: index+1, strokeColorGradient: color.fillColorGradient, strokeAlignment: 'inner'}
      }
      return {strokeOpacity: color.fillOpacity, strokeStyle: 'solid', strokeWidth: index+1, strokeColor: color.fillColor, strokeAlignment: 'inner'}
    })

    selection[0].fills = strokes.map((color,index) => {
      //console.log(color)
      if(!color.strokeColor){
        return {fillColorGradient: color.strokeColorGradient}
      }
      return {fillColor: color.strokeColor, fillOpacity: color.strokeOpacity}
    })

    /*
    selection[0].strokes = fills.map((color,index) => {strokeOpacity: 1, strokeStyle: 'solid', strokeWidth: 1, strokeColor: color, strokeAlignment: 'inner'})
    selection[0].fills = strokes.map((color,index) => {fillColor: color, fillOpacity: 1})
    */

  }

  if(message === "log-selection") {
    console.log(selection)
  }

});


// Update the theme in the iframe
penpot.on("themechange", (theme) => {
  penpot.ui.sendMessage({
    source: "penpot",
    type: "themechange",
    theme,
  });
});
