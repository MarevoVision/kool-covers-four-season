import $ from 'jquery';
import './ArViewer.scss';
import ArViewerHTML from './ArViewer.html';

export function ArViewerComponent(container) {
    $(".main-content").after(ArViewerHTML);
}