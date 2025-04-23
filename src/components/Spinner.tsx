import CircularProgress from '@mui/material/CircularProgress';

export function Spinner({
  show,
  wait,
}: {
  show?: boolean
  wait?: `delay-${number}`
}) {
  return (
    <div
      className={`inline-block p-3 ${(show ?? true)
        ? `opacity-1 duration-500 ${wait ?? 'delay-300'}`
        : 'duration-500 opacity-0 delay-0'
        }`}
    >
      <CircularProgress />
    </div>
  )
}