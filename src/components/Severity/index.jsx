export default function Severity({severity, classes}) {

    const severityColorMap = {
        "Critical": "text-bg-dark",
        "Severe": "text-bg-danger",
        "Moderate": "text-bg-warning",
        "Low": "text-bg-success",
        "Info": "text-bg-info",
        "Unknown": "text-bg-secondary",
    }

    return (
        <span className={classes + " badge " + severityColorMap[severity.name]}>{severity.name}</span>
    )
}