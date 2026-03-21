import { useEffect } from "react";
import { useAppSelector } from "@/App/hooks";
import { useFlexibleDate } from "@/Features/Flights/hooks/useFlexibaleDate";
import { Grid, Box, Paper, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { format } from "date-fns";
import { flexibleDateType } from "../../../src/Types/FlexibaleDate/type";
import { completeMonthFlexibleDate } from "@/Utils/FlexibleDateUtils";

// ✅ Moved outside component to avoid re-creation on every render
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#FFFFFF",
    ...theme.typography.body2,
    padding: theme.spacing(2.5),
    textAlign: 'center',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '16px',
    border: '1.5px solid transparent',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    position: 'relative',
    overflow: 'hidden',

    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '20%',
        width: '60%',
        height: '3px',
        borderRadius: '0 0 4px 4px',
        background: 'linear-gradient(90deg, #6C9BF5, #4F78E0)',
        opacity: 0,
        transition: 'opacity 0.25s ease',
    },

    '&:hover': {
        transform: 'translateY(-4px)',
        borderColor: '#6C9BF5',
        boxShadow: '0 8px 28px rgba(108, 155, 245, 0.18)',
        '&::before': { opacity: 1 },
    },

    ...theme.applyStyles('dark', {
        backgroundColor: '#1E2533',
        boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
    }),
}));

export default function FlexibleDate() {
    const fromAirport = useAppSelector((state) => state.swap.from);
    const toAirport = useAppSelector((state) => state.swap.to);

    const departureCode = fromAirport?.code;
    const arrivalCode = toAirport?.code;

    const { data, isLoading } = useFlexibleDate(departureCode, arrivalCode);

    useEffect(() => {
        if (data) console.log("Flexible date data:", data);
    }, [data]);

    return (
        <div className="px-4">
            <Box sx={{ flexGrow: 1, padding: "10px 0px" }}>
                <Grid container spacing={2}>
                    {isLoading ? (
                        <h1>Loading ....</h1>
                    ) : (
                        completeMonthFlexibleDate(data ?? []).map((dt: flexibleDateType) => {
                            // ✅ month is 1-based in your type, subtract 1 for Date constructor
                            const date = new Date(parseInt(dt.year), parseInt(dt.month) - 1, 1);

                            return (
                                // ✅ Added key prop
                                <Grid key={`${dt.year}-${dt.month}`} size={2} height="150px">
                                    <Item>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 600,
                                                fontSize: '0.82rem',
                                                letterSpacing: '0.06em',
                                                textTransform: 'uppercase',
                                                color: 'text.secondary',
                                                mb: 0.8,
                                            }}
                                        >
                                            {format(date, "MMM yyyy")}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 600,
                                                fontSize: '1rem',
                                                color: dt.hasValue ? '#4F78E0' : 'text.disabled',
                                                letterSpacing: '-0.01em',
                                            }}
                                        >
                                            {dt.hasValue
                                                ? new Intl.NumberFormat('en-US', {
                                                    style: 'currency',
                                                    currency: 'EUR',
                                                }).format(dt.price)
                                                : '—'
                                            }
                                        </Typography>
                                    </Item>
                                </Grid>
                            );
                        })
                    )}
                </Grid>
            </Box>
        </div>
    );
}