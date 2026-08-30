import { useEffect, useState } from 'react';
import TransactionCard from './components/TransactionCard';
import MetricCard from './components/MetricCard';
import VisualizerChart from './components/VisualizerChart';
import './styles/components.css';

export default function App() {
	const [streamData, setStreamData] = useState(null);
	const [isConnected, setIsConnected] = useState(false);

	useEffect(() => {
		const ws = new WebSocket('ws://localhost:8000/ws/stream');

		ws.onopen = () => setIsConnected(true);
		ws.onclose = () => setIsConnected(false);
		ws.onmessage = (event) => {
			const parsed = JSON.parse(event.data);
			setStreamData(parsed);
		};

		return () => ws.close();
	}, []);

	return (
		<div className="dashboard-container">
			<header className="dashboard-header">
				<div>
				<h1>Real-Time ML Fraud Monitoring</h1>
				<p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
				</p>
				</div>
				<div className="status-indicator">
				<span className={`dot ${isConnected ? 'dot-active' : 'dot-inactive'}`} />
				<span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>
					{isConnected ? 'Stream Active' : 'Disconnected'}
				</span>
				</div>
			</header>

			{streamData ? (
				<div className="dashboard-grid">
				<TransactionCard transaction={streamData.transaction} />
				<MetricCard 
					probability={streamData.analysis.fraud_probability} 
					isFlagged={streamData.analysis.is_flagged} 
				/>
				<VisualizerChart attributions={streamData.analysis.feature_attributions} />
				</div>
			) : (
				<div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--color-text-muted)' }}>
				Connecting to real-time stream...
				</div>
			)}
		</div>
	);
}