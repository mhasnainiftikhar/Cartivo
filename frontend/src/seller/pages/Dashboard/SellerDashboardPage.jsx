import React, { useState } from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    useTheme
} from '@mui/material';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import {
    TrendingUp,
    AttachMoney,
    ShoppingBag,
    Person
} from '@mui/icons-material';

// Mock Data
const dailyData = [
    { name: '00:00', sales: 120 }, { name: '04:00', sales: 80 },
    { name: '08:00', sales: 250 }, { name: '12:00', sales: 450 },
    { name: '16:00', sales: 300 }, { name: '20:00', sales: 550 },
];

const weeklyData = [
    { name: 'Mon', sales: 1200 }, { name: 'Tue', sales: 2100 },
    { name: 'Wed', sales: 1800 }, { name: 'Thu', sales: 3200 },
    { name: 'Fri', sales: 2800 }, { name: 'Sat', sales: 4500 },
    { name: 'Sun', sales: 3800 },
];

const monthlyData = [
    { name: 'Week 1', sales: 12000 }, { name: 'Week 2', sales: 15000 },
    { name: 'Week 3', sales: 11000 }, { name: 'Week 4', sales: 18000 },
];

const yearlyData = [
    { name: 'Jan', sales: 5000 }, { name: 'Feb', sales: 8000 },
    { name: 'Mar', sales: 7000 }, { name: 'Apr', sales: 12000 },
    { name: 'May', sales: 15000 }, { name: 'Jun', sales: 18000 },
    { name: 'Jul', sales: 20000 }, { name: 'Aug', sales: 22000 },
    { name: 'Sep', sales: 19000 }, { name: 'Oct', sales: 25000 },
    { name: 'Nov', sales: 30000 }, { name: 'Dec', sales: 35000 },
];

const OverviewCard = ({ title, value, icon, color }) => (
    <Card sx={{ height: '100%' }}>
        <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography color="text.secondary" gutterBottom variant="overline">
                        {title}
                    </Typography>
                    <Typography variant="h4" component="div">
                        {value}
                    </Typography>
                </Box>
                <Box sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: `${color}15`,
                    color: color,
                    display: 'flex'
                }}>
                    {icon}
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <TrendingUp sx={{ color: 'success.main', fontSize: 18, mr: 0.5 }} />
                <Typography variant="body2" color="success.main" sx={{ fontWeight: 'bold', mr: 1 }}>
                    +12%
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    since last month
                </Typography>
            </Box>
        </CardContent>
    </Card>
);

const SellerDashboardPage = () => {
    const [timeRange, setTimeRange] = useState('weekly');
    const theme = useTheme();

    const getChartData = () => {
        switch (timeRange) {
            case 'daily': return dailyData;
            case 'weekly': return weeklyData;
            case 'monthly': return monthlyData;
            case 'yearly': return yearlyData;
            default: return weeklyData;
        }
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>Dashboard Overview</Typography>

            {/* Overview Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <OverviewCard
                        title="Total Revenue"
                        value="$45,231.89"
                        icon={<AttachMoney />}
                        color={theme.palette.primary.main}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <OverviewCard
                        title="Total Orders"
                        value="1,345"
                        icon={<ShoppingBag />}
                        color={theme.palette.warning.main}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <OverviewCard
                        title="New Customers"
                        value="345"
                        icon={<Person />}
                        color={theme.palette.info.main}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <OverviewCard
                        title="Growth"
                        value="24.5%"
                        icon={<TrendingUp />}
                        color={theme.palette.success.main}
                    />
                </Grid>
            </Grid>

            {/* Sales Chart */}
            <Card sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>Sales Analytics</Typography>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <Select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            displayEmpty
                        >
                            <MenuItem value="daily">Daily</MenuItem>
                            <MenuItem value="weekly">Weekly</MenuItem>
                            <MenuItem value="monthly">Monthly</MenuItem>
                            <MenuItem value="yearly">Yearly</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ height: 400, width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={getChartData()}>
                            <defs>
                                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: theme.palette.text.secondary }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: theme.palette.text.secondary }}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    borderRadius: '10px',
                                    border: 'none',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="sales"
                                stroke={theme.palette.primary.main}
                                fillOpacity={1}
                                fill="url(#colorSales)"
                                strokeWidth={3}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </Box>
            </Card>
        </Box>
    );
};

export default SellerDashboardPage;
