export function CloseButton({ color, onClick, addClass }) {
  return (
    <span
      onClick={onClick}
      className={`flex aspect-square h-full cursor-pointer items-center justify-center rounded-full border bg-white p-1 border-${color} ${addClass}`}>
      <svg className={`h-full max-h-4 w-full max-w-4`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" />
      </svg>
    </span>
  );
}

export function ImageIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-full max-h-6 w-full max-w-6" viewBox="0 0 24 24">
      <path
        fill="#222222"
        d="M4 20V4h8.616v1H5v14h14v-7.615h1V20zm2.77-3.616h10.46L14 12.077l-3 3.789l-2-2.404zM17 9V7h-2V6h2V4h1v2h2v1h-2v2z"
      />
    </svg>
  );
}

export function FileIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-full max-h-6 w-full max-w-6" viewBox="0 0 24 24">
      <path
        fill="#222222"
        d="M4.616 19q-.691 0-1.153-.462T3 17.384V6.616q0-.691.463-1.153T4.615 5h4.31q.323 0 .628.13q.305.132.522.349L11.596 7h7.789q.69 0 1.153.463T21 8.616v8.769q0 .69-.462 1.153T19.385 19zm8.776-5.5l-1.56 1.56q-.14.14-.15.344t.15.363t.355.16t.354-.16l2.201-2.201q.242-.243.242-.566t-.242-.565l-2.202-2.202q-.14-.14-.344-.15t-.363.15t-.16.353t.16.354l1.56 1.56h-4.2q-.214 0-.357.143T8.692 13t.143.357t.357.143z"
      />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-full min-h-4 w-full min-w-4" viewBox="0 0 24 24" fill="none">
      <path d="M6 12H18M12 6V18" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
}
