// components/SideMenu.tsx
export default function SideMenu({ selectedOption, onSelectOption }) {
    return (
      <div className="flex flex-col w-1/5 bg-gray-100 h-screen p-4">
        <h2 className="text-xl font-bold">Options</h2>
        <ul>
          <li className={selectedOption === 'photos' ? 'font-bold' : ''}>
            <button onClick={() => onSelectOption('photos')}>Photos</button>
          </li>
          <li className={selectedOption === 'template' ? 'font-bold' : ''}>
            <button onClick={() => onSelectOption('template')}>Templates</button>
          </li>
          <li className={selectedOption === 'text' ? 'font-bold' : ''}>
            <button onClick={() => onSelectOption('text')}>Text</button>
          </li>
          <li className={selectedOption === 'cliparts' ? 'font-bold' : ''}>
            <button onClick={() => onSelectOption('cliparts')}>Cliparts</button>
          </li>
          <li className={selectedOption === 'background' ? 'font-bold' : ''}>
            <button onClick={() => onSelectOption('background')}>Background</button>
          </li>
        </ul>
      </div>
    );
  }
  