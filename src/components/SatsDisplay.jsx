import "./SatsDisplay.module.css";

function SatsDisplay({sats, msg}) {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md text-center display-1">
          {sats}
          <i className="fak fa-satoshisymbol-outlinetilt"/>
          <h6>{msg}</h6>
        </div>
      </div>
    </div>
  )
}

export default SatsDisplay;
