import React, { useState, useEffect } from 'react';
import NaryTree from './utils/NaryTree';
import Sidebar from './components/Sidebar';
import {
  DefaultComponent,
  ProfileComponent,
  AccountSettingsComponent,
  SecurityPrivacyComponent,
  MessagesComponent,
  InboxComponent,
  NotificationsComponent,
  SettingsComponent,
  DashboardComponent,
  HelpComponent,
  FAQComponent
} from './components/MenuComponents';

function App() {
  const [menuTree] = useState(() => new NaryTree());
  const [visibleNodes, setVisibleNodes] = useState([]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [currentComponent, setCurrentComponent] = useState(() => DefaultComponent);

  // Inicializar el árbol de menús
  const initializeMenuTree = () => {
    console.log('🌳 Inicializando árbol N-ario de menús...');

    // Crear nodo raíz
    const root = menuTree.setRoot('Dashboard', '/dashboard', DashboardComponent, '📊');

    // Crear menú de Perfil
    const profileNode = menuTree.addNode(root, 'Perfil', '/profile', ProfileComponent, '👤');

    // Crear menú de Mensajes con submenús
    const messagesNode = menuTree.addNode(root, 'Mensajes', '/messages', MessagesComponent, '💬');
    menuTree.addNode(messagesNode, 'Bandeja de Entrada', '/messages/inbox', InboxComponent, '📥');
    menuTree.addNode(messagesNode, 'Notificaciones', '/messages/notifications', NotificationsComponent, '🔔');

    // Crear menú de Configuración con submenús
    const settingsNode = menuTree.addNode(root, 'Configuración', '/settings', SettingsComponent, '⚙️');
    menuTree.addNode(settingsNode, 'Cuenta', '/settings/account', AccountSettingsComponent, '👤');
    menuTree.addNode(settingsNode, 'Seguridad y Privacidad', '/settings/security', SecurityPrivacyComponent, '🔒');

    // Crear menú de Ayuda con submenús
    const helpNode = menuTree.addNode(root, 'Ayuda', '/help', HelpComponent, '❓');
    menuTree.addNode(helpNode, 'Preguntas Frecuentes', '/help/faq', FAQComponent, '📋');
    menuTree.addNode(helpNode, 'Contacto', '/help/contact', null, '📞');
    menuTree.addNode(helpNode, 'Tutorial', '/help/tutorial', null, '🎓');

    // Expandir algunos nodos por defecto
    root.isExpanded = true;
    messagesNode.isExpanded = true;

    menuTree.printTreeInfo();
    updateVisibleNodes();
  };

  // Actualizar nodos visibles
  const updateVisibleNodes = () => {
    const nodes = menuTree.getVisibleNodes();
    setVisibleNodes(nodes);
  };

  // Manejar clic en nodo
  const handleNodeClick = (node) => {
    setSelectedNodeId(node.id);

    if (node.component) {
      setCurrentComponent(() => node.component);
    } else {
      setCurrentComponent(() => () => (
        <div style={{
          padding: '30px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#333', marginTop: 0 }}>
            {node.icon} {node.title}
          </h2>
          <p style={{ color: '#666' }}>Esta sección está en construcción.</p>
          <p style={{ color: '#999', fontSize: '14px' }}>Enlace: {node.link}</p>
        </div>
      ));
    }

    if (node.hasChildren && !node.isExpanded) {
      handleToggleExpand(node.id);
    }
  };

  // Manejar expansión/colapso
  const handleToggleExpand = (nodeId) => {
    const node = menuTree.findNodeById(nodeId);
    if (node && node.hasChildren) {
      node.toggleExpanded();
      updateVisibleNodes();
    }
  };

  // Expandir todo
  const expandAll = () => {
    if (menuTree.root) {
      menuTree.root.expandAll();
      updateVisibleNodes();
    }
  };

  // Colapsar todo
  const collapseAll = () => {
    if (menuTree.root) {
      menuTree.root.collapseAll();
      menuTree.root.isExpanded = true;
      updateVisibleNodes();
    }
  };

  useEffect(() => {
    initializeMenuTree();
  }, []);

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Arial, sans-serif'
    }}>
      <Sidebar
        menuTree={menuTree}
        visibleNodes={visibleNodes}
        selectedNodeId={selectedNodeId}
        onNodeClick={handleNodeClick}
        onToggleExpand={handleToggleExpand}
      />

      <div style={{
        marginLeft: '300px',
        flex: 1,
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          padding: '20px 30px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{ margin: '0 0 5px 0', color: '#333', fontSize: '28px' }}>
              🌳 Challenge 15 - Árboles N-arios
            </h1>
            <p style={{ margin: 0, color: '#666', fontSize: '16px' }}>
              Sistema de menús jerárquicos con árbol N-ario
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={expandAll} style={{
              padding: '8px 15px', backgroundColor: '#28a745', color: 'white',
              border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px'
            }}>
              📂 Expandir Todo
            </button>
            <button onClick={collapseAll} style={{
              padding: '8px 15px', backgroundColor: '#6c757d', color: 'white',
              border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px'
            }}>
              📁 Colapsar Todo
            </button>
          </div>
        </div>

        {selectedNodeId && (
          <div style={{
            backgroundColor: 'white', borderRadius: '8px', padding: '15px 20px',
            marginBottom: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            border: '1px solid #e9ecef'
          }}>
            <div style={{ fontSize: '14px', color: '#666', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span>📍 Estás en:</span>
              {(() => {
                const node = menuTree.findNodeById(selectedNodeId);
                if (node) {
                  const path = menuTree.getPathToNode(node);
                  return path.map((title, index) => (
                    <span key={index} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      {index > 0 && <span style={{ color: '#ccc' }}>→</span>}
                      <span style={{
                        color: index === path.length - 1 ? '#007bff' : '#666',
                        fontWeight: index === path.length - 1 ? 'bold' : 'normal'
                      }}>
                        {title}
                      </span>
                    </span>
                  ));
                }
                return null;
              })()}
            </div>
          </div>
        )}

        <div style={{ minHeight: '400px' }}>
          {React.createElement(currentComponent)}
        </div>

        <div style={{
          backgroundColor: 'white', borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)', padding: '20px', marginTop: '20px'
        }}>
          <h3 style={{ color: '#333', marginTop: 0 }}>📊 Información del Árbol N-ario</h3>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px', marginTop: '15px'
          }}>
            <div style={{ backgroundColor: '#e7f3ff', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
              <h4 style={{ color: '#007bff', margin: '0 0 5px 0' }}>Total de Nodos</h4>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', margin: 0 }}>
                {menuTree.getTotalNodeCount()}
              </p>
            </div>
            <div style={{ backgroundColor: '#d4edda', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
              <h4 style={{ color: '#28a745', margin: '0 0 5px 0' }}>Altura Máxima</h4>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', margin: 0 }}>
                {menuTree.getMaxDepth()}
              </p>
            </div>
            <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
              <h4 style={{ color: '#ffc107', margin: '0 0 5px 0' }}>Nodos Visibles</h4>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', margin: 0 }}>
                {visibleNodes.length}
              </p>
            </div>
          </div>

          <div style={{
            marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa',
            borderRadius: '8px', border: '1px solid #dee2e6'
          }}>
            <h4 style={{ color: '#333', marginTop: 0, fontSize: '16px' }}>💡 Cómo usar</h4>
            <div style={{ fontSize: '14px', color: '#666' }}>
              <div>• Haz clic en los elementos del menú lateral para navegar</div>
              <div>• Usa las flechas ▶/▼ para expandir/colapsar submenús</div>
              <div>• Abre la consola del navegador (F12) para ver los logs</div>
              <div>• Los elementos con 🔗 tienen enlaces configurados</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;