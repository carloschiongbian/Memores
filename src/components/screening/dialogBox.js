const DialogBox = ({ showDialog, cancelNavigation, confirmNavigation, }) => {
    return (
        <>
            <div className={`${showDialog ? 'modal fade show d-block' : 'modal fade'}`} style={{ 'zIndex': '10000' }}>
                <div className="modal-dialog shadow-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-primary">
                            <h5 className="modal-title text-white">Leave Page?</h5>
                        </div>
                        <div className="modal-body">
                            <p className="mb-0">You haven't finished the screening assessment yet. Do you want to leave without finishing?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" onClick={cancelNavigation}>Stay on Page</button>
                            <button type="button" className="btn btn-danger" onClick={confirmNavigation}>Leave Page</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DialogBox;