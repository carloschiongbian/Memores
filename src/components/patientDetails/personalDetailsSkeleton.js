import { Skeleton } from "@mui/material";
import TextSkeleton from "./textSkeleton";

const PersonalDetailsSkeleton = () => {
    return (
        <div className="row bg-white rounded-4 py-2">
            <div className="col-12 col-md-4 mt-4 mt-lg-0 d-flex flex-column align-items-center justify-content-center">
                <Skeleton width={164} height={164} variant="circular" />
                <p className="mb-0 mt-2 fw-bold fs-4 text-center">
                    <Skeleton variant="text" sx={{ fontSize: "1.75rem" }} width="150px" />
                </p>
            </div>
            <div className="col-12 col-md-8 px-0 pe-4">
                <TextSkeleton rows={8}></TextSkeleton>
            </div>
        </div>);
}

export default PersonalDetailsSkeleton;