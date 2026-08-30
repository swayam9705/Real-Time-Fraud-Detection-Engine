export default function TransactionCard({ transaction }) {
    if (!transaction) return null;

    const rows = [
        { label: 'Amount', value: `$${transaction.amount.toFixed(2)}`, highlight: true },
        { label: 'Distance Home', value: `${transaction.distance_from_home.toFixed(1)} km` },
        { label: 'Time Since Prev TX', value: `${transaction.time_since_last_tx.toFixed(0)} sec` },
        { label: 'Foreign TX', value: transaction.is_foreign === 1 ? 'Yes' : 'No' },
        { label: 'Failed PIN Count', value: transaction.failed_pin_attempts },
    ];

    return (
        <div className="ui-card">
        <h2 className="ui-card-title">Incoming Transaction</h2>
        <div style={{ marginTop: '12px' }}>
            {rows.map((row, index) => (
            <div className="data-row" key={index}>
                <span className="data-label">{row.label}</span>
                <span className={`data-value ${row.highlight ? 'text-highlight' : ''}`}>
                {row.value}
                </span>
            </div>
            ))}
        </div>
        </div>
    );
}