// components/PhotoBook/hooks/useOverlayEditor.ts
import { useRef, useState, useEffect } from 'react';
import { overlayDefaultEditor } from '@pqina/pintura';

interface UseOverlayEditorProps {
  initialImage?: string;
  stickers?: any[];
}

const useOverlayEditor = ({ initialImage, stickers }: UseOverlayEditorProps) => {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [imageState, setImageState] = useState<any>(null);
  const overlayEditorRef = useRef<HTMLDivElement>(null);

  const openOverlayEditor = () => {
    if (!overlayEditorRef.current || !image) return;

    setIsOverlayOpen(true);
    const editor = overlayDefaultEditor(overlayEditorRef.current, {
      src: image,
      imageState: imageState,
      stickers,
    });

    editor.on('process', (res) => {
      setImageState(res.imageState);
      const newImageUrl = URL.createObjectURL(res.dest);
      setImage(newImageUrl);

      editor.destroy();
      setEditorInstance(null);
      setIsOverlayOpen(false);
    });

    setEditorInstance(editor);
  };

  const closeOverlayEditor = () => {
    if (editorInstance) {
      editorInstance.destroy();
      setEditorInstance(null);
    }
    setIsOverlayOpen(false);
  };

  // Cleanup: Revoke previous image URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);

  return {
    image,
    setImage,
    openOverlayEditor,
    closeOverlayEditor,
    isOverlayOpen,
    overlayEditorRef,
  };
};

export default useOverlayEditor;
