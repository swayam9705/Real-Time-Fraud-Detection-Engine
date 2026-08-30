export default function MetricCard({ probability, isFlagged }) {
    const percentage = (probability * 100).toFixed(1);

    return (
        <div className="ui-card" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <h2 className="ui-card-title">Fraud Score</h2>
        <div style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'monospace', margin: '16px 0' }}>
            {percentage}%
        </div>
        <div className={`badge ${isFlagged ? 'badge-flagged' : 'badge-legit'}`}>
            {isFlagged ? 'High Risk - Flagged' : 'Legitimate'}
        </div>
        </div>
    );
}