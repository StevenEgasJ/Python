import React, {useEffect, useState, useMemo} from 'react'

function Avatar({name}){
  const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500']
  const hash = (name || '').charCodeAt(0)
  const colorClass = colors[hash % colors.length]
  const initials = name ? name.split(' ').slice(0,2).map(n=>n[0]).join('').toUpperCase() : '?'
  return (
    <div className={`w-10 h-10 rounded-full ${colorClass} flex items-center justify-center overflow-hidden text-sm text-white font-semibold`}>
      <span>{initials}</span>
    </div>
  )
}

function fmtCurrency(v){
  if(v == null) return '—'
  return `$${Number(v).toFixed(2)}`
}

export default function UserTable(){
  const [users, setUsers] = useState([])
  const [q, setQ] = useState('')
  const [sortKey, setSortKey] = useState('fullname')
  const [sortDir, setSortDir] = useState('asc')
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    setLoading(true)
    fetch('/api/customers/')
      .then(r => r.json())
      .then(data=> setUsers(data))
      .catch(e => console.error('Fetch failed:', e))
      .finally(()=> setLoading(false))
  },[])

  const filtered = useMemo(()=>{
    let res = users.filter(u => {
      const s = (u.fullname||'') + ' ' + (u.email||'') + ' ' + (u.type||'')
      return s.toLowerCase().includes(q.toLowerCase())
    })
    res.sort((a,b)=>{
      const A = ((a[sortKey] || '') + '').toString().toLowerCase()
      const B = ((b[sortKey] || '') + '').toString().toLowerCase()
      if(A < B) return sortDir === 'asc' ? -1 : 1
      if(A > B) return sortDir === 'asc' ? 1 : -1
      return 0
    })
    return res
  }, [users, q, sortKey, sortDir])

  function toggleSort(key){
    if(sortKey === key) setSortDir(dir => dir === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  return (
    <div className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-200" onClick={()=>toggleSort('id')}>ID</th>
              <th className="text-left px-6 py-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-200" onClick={()=>toggleSort('fullname')}>Full Name</th>
              <th className="text-left px-6 py-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-200 hidden sm:table-cell" onClick={()=>toggleSort('email')}>Email</th>
              <th className="text-left px-6 py-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-200" onClick={()=>toggleSort('type')}>Type</th>
              <th className="text-right px-6 py-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-200 hidden md:table-cell" onClick={()=>toggleSort('discount')}>Discount</th>
              <th className="text-right px-6 py-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-200" onClick={()=>toggleSort('totalSale')}>Total Sale</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="p-8 text-center text-gray-500" colSpan={5}>Loading…</td></tr>
            ) : (filtered.length === 0 ? (
              <tr><td className="p-8 text-center text-gray-500" colSpan={5}>No customers found</td></tr>
            ) : (
              filtered.map((u, idx) => (
                <tr key={u.id} className={`border-b border-gray-100 hover:bg-gray-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="px-6 py-4 text-sm text-gray-700 font-semibold">{u.id}</td>
                  <td className="px-6 py-4 align-middle">
                    <div className="flex items-center gap-3">
                      <Avatar name={u.fullname} />
                      <div>
                        <div className="font-medium text-gray-800">{u.fullname || <em className="text-gray-400">—</em>}</div>
                        <div className="text-xs text-gray-600 sm:hidden">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 hidden sm:table-cell">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                      {u.type || '—'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right hidden md:table-cell text-sm text-gray-700">{u.discount != null ? `${u.discount}%` : '—'}</td>
                  <td className="px-6 py-4 text-right font-semibold text-gray-800">{fmtCurrency(u.totalSale)}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
