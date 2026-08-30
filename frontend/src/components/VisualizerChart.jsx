import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function VisualizerChart({ attributions }) {
    return (
        <div className="ui-card">
            <h2 className="ui-card-title">Local Feature Impact (SHAP)</h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                Positive pushes toward Fraud, Negative pushes toward Legitimate.
            </p>
            <div style={{ height: '200px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={attributions}
                        layout="vertical"
                        margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
                    >
                        <XAxis
                            type="number"
                            domain={[-2, 2]}
                            stroke="#6b6b66"
                            tickLine={true}
                            axisLine={{ stroke: '#d4d4d1' }}
                            tick={{ fill: '#444', fontSize: 11 }}
                        />
                        <YAxis
                            dataKey="feature"
                            type="category"
                            stroke="#6b6b66"
                            width={110}
                            tickLine={true}
                            axisLine={{ stroke: '#d4d4d1' }}
                            tick={{ fill: '#444', fontSize: 11 }}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(17, 17, 17, 0.04)' }}
                            contentStyle={{
                                backgroundColor: 'white',
                                borderColor: '#d7d7d3',
                                borderRadius: '0px',
                                color: '#111111',
                            }}
                            labelStyle={{ color: '#111111', fontWeight: 700 }}
                        />
                        <Bar
                            dataKey="impact"
                            radius={[0, 0, 8, 0]}
                        >
                            {attributions.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.impact > 0 ? '#111111' : '#d9d9d5'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}