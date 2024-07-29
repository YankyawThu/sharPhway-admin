import { CKEditor } from '@ckeditor/ckeditor5-react'
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo, Font, Underline, Link, BlockQuote, Strikethrough, Highlight, Alignment, Indent, PageBreak, FindAndReplace, Table, TableProperties, TableCellProperties, TableColumnResize, TextTransformation, FontSize, List } from 'ckeditor5'
import 'ckeditor5/ckeditor5.css'

export default function Editor ({text, setText}) {
    return (
        <CKEditor
            editor={ ClassicEditor }
            data={text}
            config={ {
                toolbar: {
                    items: [ 'undo', 'redo', '|', 'Bold', 'Italic', 'Underline', '|', 'FontFamily', 'FontColor', 'FontBackgroundColor', 'FontSize', '|', 'Link', 'BlockQuote', 'Strikethrough', 'Highlight', '|', 'Alignment', 'Indent', 'Outdent', 'PageBreak', '|', 'Table', 'TableProperties', 'TableCellProperties', 'insertTable', '|', 'FindAndReplace' ],
                    shouldNotGroupWhenFull: true
                },
                link: {
                    addTargetToExternalLinks: true,
                    defaultProtocol: 'https://',
                },
                table: {
                    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
                },
                plugins: [
                    Bold, Essentials, Italic, Mention, Paragraph, Undo, Font, Underline, Link, BlockQuote, Strikethrough, Highlight, Alignment, Indent, PageBreak, FindAndReplace, Table, TableProperties, TableCellProperties, TableColumnResize, TextTransformation, FontSize, List
                ],
                mention: { 
                    // Mention configuration
                },
                menuBar: {
                    isVisible: false
                },
                fontSize: {
                    options: [10,12,'default',16,18,20,22,24],
                    supportAllValues: true
                },
            } }
            onChange={(event, editor) => {
                const data = editor.getData()
                setText(data)
            }}
        />
    )
}