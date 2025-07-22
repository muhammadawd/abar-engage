import type {MenuItem} from "@/layouts/default-layout/config/types";

const MainMenuConfig: Array<MenuItem> = [
    {
        pages: [
            {
                heading: "dashboard",
                route: "/dashboard",
                keenthemesIcon: "element-11",
                bootstrapIcon: "bi-app-indicator",
            },
        ],
    },
    {
        heading: "App",
        route: "/app",
        pages: [
            {
                sectionTitle: "Analyze",
                route: "/analyze/404",
                keenthemesIcon: "graph",
                bootstrapIcon: "bi-printer",
                sub: [
                    {
                        heading: "MY Studio",
                        route: "/404",
                    },
                    {
                        heading: "Users",
                        route: "/404",
                    },
                    {
                        heading: "Behavior",
                        route: "/404",
                    },
                    {
                        heading: "Funnels",
                        route: "/404",
                    },
                    {
                        heading: "Retention",
                        route: "/404",
                    },
                    {
                        heading: "Session And Source",
                        route: "/404",
                    },
                    {
                        heading: "User Path",
                        route: "/404",
                    },
                    {
                        heading: "Acquisition",
                        route: "/404",
                    },
                    {
                        heading: "Uninstalls",
                        route: "/404",
                    },
                ],
            },
            {
                sectionTitle: "Segment",
                route: "/segment",
                keenthemesIcon: "chart-pie-3",
                bootstrapIcon: "bi-printer",
                sub: [
                    {
                        heading: "All Segments",
                        route: "/segment/all",
                    },
                    {
                        heading: "Create Segment",
                        route: "/404",
                    },
                    {
                        heading: "RFM Segment",
                        route: "/404",
                    },
                    {
                        heading: "Warehouse Segment",
                        route: "/404",
                    },
                    {
                        heading: "Predictive Segment",
                        route: "/404",
                    },
                    {
                        heading: "User Imports",
                        route: "/404",
                    },
                ],
            },
            {
                sectionTitle: "Engage",
                route: "/engage",
                keenthemesIcon: "crown",
                bootstrapIcon: "bi-printer",
                sub: [
                    {
                        heading: "Campaigns",
                        route: "/engage/campaigns",
                    },
                    {
                        heading: "Flows",
                        route: "/404",
                    },
                    {
                        heading: "Drafts",
                        route: "/404",
                    },
                ],
            },
            {
                sectionTitle: "Inform",
                route: "/analyze/404",
                keenthemesIcon: "call",
                bootstrapIcon: "bi-printer",
                sub: [
                    {
                        heading: "Alerts",
                        route: "/404",
                    },
                ],
            },
            {
                sectionTitle: "Personalize",
                route: "/analyze/404",
                keenthemesIcon: "parcel",
                bootstrapIcon: "bi-printer",
                sub: [
                    {
                        heading: "All Experiences",
                        route: "/404",
                    },
                ],
            },
            {
                sectionTitle: "Reports",
                route: "/analyze/404",
                keenthemesIcon: "subtitle",
                bootstrapIcon: "bi-printer",
                sub: [
                    {
                        heading: "Campaigns",
                        route: "/404",
                    },
                    {
                        heading: "Inform",
                        route: "/404",
                    },
                    {
                        heading: "Users",
                        route: "/404",
                    },
                ],
            },
            {
                sectionTitle: "Content",
                route: "/analyze/404",
                keenthemesIcon: "simcard-2",
                bootstrapIcon: "bi-printer",
                sub: [
                    {
                        heading: "Content Blocks",
                        route: "/404",
                    },
                    {
                        heading: "Recommendations",
                        route: "/404",
                    },
                    {
                        heading: "Coupons",
                        route: "/404",
                    },
                ],
            },
            {
                sectionTitle: "Data",
                route: "/analyze/404",
                keenthemesIcon: "abstract-45",
                bootstrapIcon: "bi-printer",
                sub: [
                    {
                        heading: "Data Imports",
                        route: "/404",
                    },
                ],
            },
        ],
    },
];

export default MainMenuConfig;
