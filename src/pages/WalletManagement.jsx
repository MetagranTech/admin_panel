import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Clock3, RefreshCw, Wallet, XCircle } from 'lucide-react';
import { getPayouts, updatePayoutStatus } from '../api';

const money = (value) => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
}).format(Number(value || 0));

const date = (value) => value
  ? new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value))
  : '-';

export default function WalletManagement() {
  const [payouts, setPayouts] = useState([]);
  const [pendingTotal, setPendingTotal] = useState(0);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState('');
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getPayouts(filter);
      setPayouts(response.data.payouts || []);
      setPendingTotal(response.data.pendingTotal || 0);
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [filter]);

  const counts = useMemo(() => ({
    pending: payouts.filter((item) => item.status === 'pending').length,
    completed: payouts.filter((item) => item.status === 'completed').length,
  }), [payouts]);

  const changeStatus = async (id, status) => {
    const action = status === 'completed' ? 'mark this payout as paid' : 'reject and refund this payout';
    if (!window.confirm(`Are you sure you want to ${action}?`)) return;
    setWorking(id);
    setError('');
    try {
      await updatePayoutStatus(id, status);
      await load();
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message);
    } finally {
      setWorking('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Wallet & Weekly Payouts</h1>
          <p className="mt-1 text-slate-500">Review Sunday requests and record manual provider payments.</p>
        </div>
        <button onClick={load} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700">
          <RefreshCw size={17} /> Refresh
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Summary icon={<Wallet />} label="Pending amount" value={money(pendingTotal)} />
        <Summary icon={<Clock3 />} label="Pending requests" value={counts.pending} />
        <Summary icon={<CheckCircle2 />} label="Paid records" value={counts.completed} />
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          ['', 'All'],
          ['pending', 'Pending'],
          ['completed', 'Paid'],
          ['failed', 'Rejected'],
        ].map(([value, label]) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`rounded-full px-4 py-2 text-sm font-bold ${filter === value ? 'bg-[#1068A8] text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                {['Provider', 'Week', 'Amount', 'Payment details', 'Requested', 'Status', 'Actions'].map((heading) => (
                  <th key={heading} className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payouts.map((payout) => (
                <tr key={payout._id} className="align-top hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="font-bold text-slate-900">{payout.provider?.name || 'Provider'}</p>
                    <p className="text-sm text-slate-500">{payout.provider?.phone || payout.provider?.email || '-'}</p>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">{date(payout.weekStart)} – {date(payout.weekEnd)}</td>
                  <td className="whitespace-nowrap px-5 py-4 font-bold text-slate-900">{money(payout.amount)}</td>
                  <td className="px-5 py-4 text-sm text-slate-700"><PaymentDetails payout={payout} /></td>
                  <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">{date(payout.createdAt)}</td>
                  <td className="px-5 py-4"><Status status={payout.status} /></td>
                  <td className="px-5 py-4">
                    {payout.status === 'pending' ? (
                      <div className="flex min-w-max gap-2">
                        <button disabled={working === payout._id} onClick={() => changeStatus(payout._id, 'completed')} className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-bold text-white disabled:opacity-50">Mark Paid</button>
                        <button disabled={working === payout._id} onClick={() => changeStatus(payout._id, 'failed')} className="rounded-lg border border-red-200 px-3 py-2 text-sm font-bold text-red-600 disabled:opacity-50">Reject</button>
                      </div>
                    ) : <span className="text-sm text-slate-400">Processed {date(payout.processedAt)}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && payouts.length === 0 && <div className="p-12 text-center text-slate-500">No payout records found.</div>}
        {loading && <div className="p-12 text-center text-slate-500">Loading payouts…</div>}
      </div>
    </div>
  );
}

function Summary({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="rounded-xl bg-blue-50 p-3 text-[#1068A8]">{icon}</div>
      <div><p className="text-sm text-slate-500">{label}</p><p className="text-2xl font-bold text-slate-900">{value}</p></div>
    </div>
  );
}

function PaymentDetails({ payout }) {
  const details = payout.payoutDetails || {};
  if (payout.payoutMethod === 'upi') return <><b>UPI</b><br />{details.upiId || '-'}</>;
  return <><b>{details.bankName || 'Bank transfer'}</b><br />{details.accountHolderName || '-'}<br />A/C ••••{String(details.accountNumber || '').slice(-4)}<br />IFSC {details.ifscCode || '-'}</>;
}

function Status({ status }) {
  const styles = {
    pending: 'bg-amber-50 text-amber-700',
    completed: 'bg-emerald-50 text-emerald-700',
    failed: 'bg-red-50 text-red-700',
  };
  const Icon = status === 'completed' ? CheckCircle2 : status === 'failed' ? XCircle : Clock3;
  return <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold capitalize ${styles[status] || 'bg-slate-100'}`}><Icon size={13} />{status}</span>;
}
