'use client';

import { useState , useEffect ,useRef } from 'react';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline, faAlignLeft, faAlignCenter, faAlignRight, faIndent, faLink, faListOl, faListUl, faOutdent, faPalette, faRedo, faSubscript, faSuperscript, faUndo, faUnlink } from '@fortawesome/free-solid-svg-icons';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const Doc: React.FC = () => {
  const [fontSize, setFontSize] = useState<string>('text-base'); // Default font size
  const [textAlign, setTextAlign] = useState<string>('text-left'); // Default text alignment
  const [margin, setMargin] = useState<string>('m-2'); // Default margin
  const [padding, setPadding] = useState<string>('p-2');// Default padding
  const [content, setContent] = useState<string>(''); 

  const handleExecCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  const editableRef = useRef<HTMLDivElement>(null);

  const handleCreateLink = () => {
    const url = prompt('Enter the URL:', 'http://');
    if (url) {
      handleExecCommand('createLink', url);
    }
  };

  const handleChangeColor = () => {
    const color = (document.getElementById('colorPicker') as HTMLInputElement).value;
    handleExecCommand('foreColor', color);
  };

  const handleChangeFont = (font: string) => {
    handleExecCommand('fontName', font);
  };

  const handleSaveContent = () => {
    if (editableRef.current) {
      const newContent = editableRef.current.innerHTML;
      setContent(newContent);
      localStorage.setItem('docContent', newContent); // Save to local storage
    }
  };

  // Load content from local storage on component mount
  useEffect(() => {
    const savedContent = localStorage.getItem('docContent');
    if (savedContent && editableRef.current) {
      editableRef.current.innerHTML = savedContent;
      setContent(savedContent);
    }
  }, []);
console.log(content)
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-dark-100 p-2">
      <div className="flex flex-col w-full max-w-4xl bg-slate-900 p-10 rounded-lg shadow-lg">
        {/* Controls Container */}
        <div className="flex flex-row mb-4 gap-4">
          {/* Font Size Selector */}
          <div className="w-fit text-white">
            <Select onValueChange={(value) => handleExecCommand('fontSize', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Font Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">H1</SelectItem>
                <SelectItem value="2">H2</SelectItem>
                <SelectItem value="3">H3</SelectItem>
                <SelectItem value="4">H4</SelectItem>
                <SelectItem value="5">H5</SelectItem>
                <SelectItem value="6">H6</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Text Alignment Selector */}
          <div className="flex space-x-2">
            <Button onClick={() => handleExecCommand('justifyLeft')} className="text-white p-2 hover:bg-gray-800">
              <FontAwesomeIcon icon={faAlignLeft} />
            </Button>
            <Button onClick={() => handleExecCommand('justifyCenter')} className="text-white p-2 hover:bg-gray-800">
              <FontAwesomeIcon icon={faAlignCenter} />
            </Button>
            <Button onClick={() => handleExecCommand('justifyRight')} className="text-white p-2 hover:bg-gray-800">
              <FontAwesomeIcon icon={faAlignRight} />
            </Button>
          </div>

          {/* Margin Selector */}
          <div className="w-fit text-white">
            <Select onValueChange={setMargin}>
              <SelectTrigger>
                <SelectValue placeholder="Margin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="m-1">M1</SelectItem>
                <SelectItem value="m-2">M2</SelectItem>
                <SelectItem value="m-4">M4</SelectItem>
                <SelectItem value="m-6">M6</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Padding Selector */}
          <div className="w-fit text-white">
            <Select onValueChange={setPadding}>
              <SelectTrigger>
                <SelectValue placeholder="Padding" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="p-1">P1</SelectItem>
                <SelectItem value="p-2">P2</SelectItem>
                <SelectItem value="p-4">P4</SelectItem>
                <SelectItem value="p-6">P6</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Font Selector */}
          <div className="w-fit text-white">
            <Select onValueChange={handleChangeFont}>
              <SelectTrigger>
                <SelectValue placeholder="Font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Arial">Arial</SelectItem>
                <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                <SelectItem value="Georgia">Georgia</SelectItem>
                <SelectItem value="Courier New">Courier New</SelectItem>
                <SelectItem value="Verdana">Verdana</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Text Manipulation Buttons */}
        <div className="flex flex-wrap mb-4 gap-2">
          <Button onClick={() => handleExecCommand('bold')} className="text-white p-2 hover:bg-gray-800">
            <FontAwesomeIcon icon={faBold} />
          </Button>
          <Button onClick={() => handleExecCommand('italic')} className="text-white p-2 hover:bg-gray-800">
            <FontAwesomeIcon icon={faItalic} />
          </Button>
          <Button onClick={() => handleExecCommand('underline')} className="text-white p-2 hover:bg-gray-800">
            <FontAwesomeIcon icon={faUnderline} />
          </Button>
          <Button onClick={() => handleExecCommand('subscript')} className="text-white p-2 hover:bg-gray-800">
            <FontAwesomeIcon icon={faSubscript} />
          </Button>
          <Button onClick={() => handleExecCommand('superscript')} className="text-white p-2 hover:bg-gray-800">
            <FontAwesomeIcon icon={faSuperscript} />
          </Button>
          <Button onClick={() => handleExecCommand('insertUnorderedList')} className="text-white p-2 hover:bg-gray-800">
            <FontAwesomeIcon icon={faListUl} />
          </Button>
          <Button onClick={() => handleExecCommand('insertOrderedList')} className="text-white p-2 hover:bg-gray-800">
            <FontAwesomeIcon icon={faListOl} />
          </Button>
          <Button onClick={() => handleExecCommand('undo')} className="text-white p-2 hover:bg-gray-800">
            <FontAwesomeIcon icon={faUndo} />
          </Button>
          <Button onClick={() => handleExecCommand('redo')} className="text-white p-2 hover:bg-gray-800">
            <FontAwesomeIcon icon={faRedo} />
          </Button>
          <Button onClick={handleCreateLink} className="text-white p-2 hover:bg-gray-800">
            <FontAwesomeIcon icon={faLink} />
          </Button>
          <Button onClick={() => handleExecCommand('unlink')} className="text-white p-2 hover:bg-gray-800">
            <FontAwesomeIcon icon={faUnlink} />
          </Button>
          <Button onClick={() => handleExecCommand('indent')} className="text-white p-2 hover:bg-gray-800">
            <FontAwesomeIcon icon={faIndent} />
          </Button>
          <Button onClick={() => handleExecCommand('outdent')} className="text-white p-2 hover:bg-gray-800">
            <FontAwesomeIcon icon={faOutdent} />
          </Button>
          <Button onClick={handleChangeColor} className="text-white p-2 hover:bg-gray-800">
          <input type="color" id="colorPicker"  />
            <FontAwesomeIcon icon={faPalette} />
          </Button>
          
        </div>
        <div className="flex justify-end mb-4">
      <Button onClick={handleSaveContent} className="text-white p-2 bg-blue-500 hover:bg-blue-600">
        Save
      </Button>
    </div>
        {/* Example Text Display */}
        <div ref={editableRef} className={`text-input text-white ${fontSize} min-h-screen ${textAlign} ${margin} ${padding} bg-dark-200 rounded`} contentEditable={true}>
          Editable content goes here...
        </div>
      </div>
    </div>
  );
};

export default Doc;
