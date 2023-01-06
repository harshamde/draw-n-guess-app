import logo from "../resources/draw&guessLogo.png";

export default function AppLayout(props) {
    const { children } = props
    return (
        <div className="land-page">
            <div className="background-image fa-beat" style={{ '--fa-beat-scale': '1.007' }}></div>
            <img className="logo mt-3" src={logo} alt={"Draw & Guess"} />
            {children}
        </div>
    )
}