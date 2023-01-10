import { Skeleton } from "@mui/material";

const TextSkeleton = ({rows = 5}) => {
    return (
        <div>
            {
                [...Array(rows).keys()].map((key) => (
                    <Skeleton key={key} variant="text" sx={{ fontSize: "1.75rem" }} width="100%" />
                ))
            }
        </div>
    );
}

export default TextSkeleton;