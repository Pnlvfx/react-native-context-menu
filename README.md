# @simonegauli/react-native-context-menu

[![npm version](https://img.shields.io/npm/v/@simonegauli/react-native-context-menu)](https://www.npmjs.com/package/@simonegauli/react-native-context-menu)
[![Platform](<https://img.shields.io/badge/platform-iOS%20%7C%20Android%20(stub)%20%7C%20Web%20(stub)-lightgrey>)](https://github.com/Pnlvfx/react-native-context-menu)
[![React Native](https://img.shields.io/badge/react--native-0.76%2B-blue)](https://reactnative.dev/docs/new-architecture-intro)
[![React](https://img.shields.io/badge/react-19%2B-blue)](https://react.dev)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

Native iOS context menus (long-press / 3D Touch) for React Native — built on the New Architecture (Fabric) with a composable, slot-based API.

---

## ⚠️ Maintainer notice

I’m building this package in my free time (evenings and weekends), so development moves at a ~weekly cadence. If you need a feature, found a bug, or have any request — **please open an issue on [GitHub](https://github.com/Pnlvfx/react-native-context-menu/issues)**. That helps me prioritise what matters most to the community.

---

## React Compiler

This package is compiled with the [React Compiler](https://react.dev/learn/react-compiler). The published code is automatically optimized and memoized.

---

## Requirements

- React Native **0.76+** (Fabric / New Architecture)
- React **19.0+**
- iOS **13.0+**
- Xcode **15.0+**

The old architecture (Paper) is **not** supported. Make sure `newArchEnabled=true` in your `Podfile` / `gradle.properties`.

---

## Installation

```bash
yarn add @simonegauli/react-native-context-menu
```

Then install the CocoaPods:

```bash
cd ios pod install
```

> **Note:** Android and Web currently throw a runtime error ("not supported on this platform"). Platform-level stubs will ship in a future release.

---

## Usage

```tsx
import { StrictMode } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import * as ContextMenu from '@simonegauli/react-native-context-menu';

export default function App() {
  return (
    <StrictMode>
      <View style={styles.container}>
        <ContextMenu.Root>
          <ContextMenu.Trigger>
            <Pressable
              style={({ pressed }) => [
                styles.box,
                pressed && styles.boxPressed,
              ]}
              onPress={() => Alert.alert('Button pressed')}
            >
              <Text style={styles.label}>Tap or hold</Text>
            </Pressable>
          </ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Item
              id="share"
              title="Share"
              systemImage="square.and.arrow.up"
              onPress={() => Alert.alert('Share pressed')}
            />
            <ContextMenu.Item
              id="copy"
              title="Copy"
              systemImage="doc.on.doc"
              onPress={() => Alert.alert('Copy pressed')}
            />
            <ContextMenu.Item
              id="delete"
              title="Delete"
              systemImage="trash"
              destructive
              onPress={() => Alert.alert('Delete pressed')}
            />
          </ContextMenu.Content>
        </ContextMenu.Root>
      </View>
    </StrictMode>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 160,
    height: 80,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxPressed: { backgroundColor: 'rgba(255,255,255,0.3)' },
  label: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
```

---

## API Reference

### `ContextMenu.Root`

Wraps the context-menu interaction. Must contain one `Trigger` and one `Content`.

| Prop       | Type                   | Required | Description                               |
| ---------- | ---------------------- | -------- | ----------------------------------------- |
| `children` | `ReactNode`            | Yes      | Must include a `Trigger` and a `Content`  |
| `style`    | `StyleProp<ViewStyle>` | No       | Styles applied to the native wrapper view |

### `ContextMenu.Trigger`

Declares the view that receives the long-press / context-menu gesture. Accepts **any** `ReactNode` as its single child (typically a `Pressable`, `View`, or `Image`).

> On iOS the gesture is handled by `UIContextMenuInteraction` attached to the native view. Standard tap behaviour (e.g., `onPress`) is fully preserved.

| Prop       | Type        | Required | Description                                |
| ---------- | ----------- | -------- | ------------------------------------------ |
| `children` | `ReactNode` | Yes      | The element that triggers the context menu |

### `ContextMenu.Content`

Declares the menu items. Only renders `Item` components — other children are accepted but ignored.

| Prop       | Type        | Required | Description                             |
| ---------- | ----------- | -------- | --------------------------------------- |
| `children` | `ReactNode` | Yes      | One or more `ContextMenu.Item` elements |

### `ContextMenu.Item`

A single menu action.

| Prop          | Type         | Default      | Description                                                                                                                                                   |
| ------------- | ------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`          | `string`     | — (required) | Unique identifier for this item                                                                                                                               |
| `title`       | `string`     | — (required) | Label displayed in the menu                                                                                                                                   |
| `destructive` | `boolean`    | `false`      | Renders the item with destructive (red) styling                                                                                                               |
| `disabled`    | `boolean`    | `false`      | Greys-out the item and makes it non-interactive                                                                                                               |
| `systemImage` | `string`     | `''`         | SF Symbol name for the item icon (e.g., `"trash"`, `"square.and.arrow.up"`). See [SF Symbols](https://developer.apple.com/sf-symbols/) for the full catalogue |
| `onPress`     | `() => void` | `undefined`  | Callback invoked when the user taps the menu item                                                                                                             |

---

## Roadmap

What’s coming. Ordered roughly by priority — open an issue if you’d like to see something bumped up.

- [ ] **Item subtitle** — `subtitle` prop to show a secondary line under each item
- [ ] **Item customisation parity** — bring feature parity with similar packages such as [zeego](https://github.com/nandorojo/zeego) (inline previews, sub-menus, toggle / stateful items, custom preview providers)
- [ ] **Android support** — replace the current throw with a real Android `PopupMenu` / `FloatingToolbar` implementation
- [ ] **Web support** — replace the current throw with a working HTML/CSS context menu (native `onContextMenu` or custom overlay)
- [ ] **Platform stubs** — render `children` gracefully on unsupported platforms instead of throwing
- [ ] **Expo config plugin** — auto-link for managed Expo + CNG setups
- [ ] **Menu lifecycle callbacks** — `onMenuWillShow`, `onMenuWillHide` events
- [ ] **Dynamic items** — update menu contents at runtime without unmounting

---

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md) for the development workflow and pull request guidelines.

---

## License

MIT — see [LICENSE](./LICENSE).
