import AppLayout from "./appLayout";

export default function WaitingLobby() {
    return (
        <AppLayout>
            <div className="land-page-body">
                <div className="card p-2">
                    <div className="doodle">
                        <div className="doodle-head">
                            {/* <div className="doodle-eyes">
                                <div className="eye"></div>
                                <div className="eye"></div>
                            </div> 
                            <div className="doodle-mouth"><div class="mouth"></div></div>*/}
                        </div>
                        <div className="doodle-body"></div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}