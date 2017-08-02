// This shim pulls together what's needed to get Framer running in an iframe inside the report.
import "./Cantor/Cantor.framer/framer/framer"
import "./Cantor/Cantor.framer/framer/framer.generated"
import "./Cantor/Cantor.framer/framer/framer.modules"
import "./Cantor/Cantor.framer/app.coffee"

// Make this available for our iframe hack.
window.pako = require("pako")
