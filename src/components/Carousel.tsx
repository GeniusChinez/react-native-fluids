/* eslint-disable react-native/no-inline-styles */
import React, {
  useMemo,
  useState,
  type PropsWithChildren,
  useRef,
} from 'react';
import { Text } from './Text';
import { View } from './View';
import PagerView from 'react-native-pager-view';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'theme-native';
import { Image } from 'react-native';
import { Icon } from './Icon';
import { Dimensions } from 'react-native';
import { Columns } from './Columns';
import { Rows } from './Rows';
import { useKeyboard } from '../hooks/useKeyboard';
import { CarouselProvider } from './CarouselProvider';

export interface ItemProps extends PropsWithChildren<{}> {
  image?: string;
  label?: string;
  description?: string;
}

export type CarouselPage =
  | ({
      type: 'raw';
    } & PropsWithChildren<{}>)
  | ({
      type: 'normal';
      image?: string;
      label?: string;
      description?: string;
    } & PropsWithChildren<{}>);

export interface CarouselProps {
  items: CarouselPage[];
  showButtons?: boolean;
  handleChange?: (pageIndex: number) => void;
  initialPage?: number;
  showIndicators?: boolean;
  indicatorColor?: string;
  indicatorDarkColor?: string;
  indicatorCurrentColor?: string;
  indicatorCurrentDarkColor?: string;
}

export function Carousel(props: CarouselProps) {
  const theme = useTheme();
  const {
    items,
    showButtons,
    handleChange,
    initialPage,
    showIndicators,
    indicatorColor = theme.color.Gray[500],
    indicatorDarkColor = theme.color.Gray[400],
    indicatorCurrentColor = theme.color.Primary[500],
    indicatorCurrentDarkColor = theme.color.Primary[400],
  } = props;

  const [currentIndex, setCurrentIndex] = useState(initialPage || 0);

  const isFirstItem = useMemo(() => currentIndex === 0, [currentIndex]);

  const isLastItem = useMemo(
    () => currentIndex === items.length - 1,
    [items.length, currentIndex]
  );

  const pagerRef = useRef<PagerView>(null);
  const keyboard = useKeyboard();

  return (
    <CarouselProvider
      page={currentIndex}
      gotoPrevPage={() => {
        if (currentIndex > 0) {
          pagerRef.current?.setPage(currentIndex - 1);
        }
      }}
      gotoNextPage={() => {
        if (currentIndex < items.length - 1) {
          pagerRef.current?.setPage(currentIndex + 1);
        }
      }}
      isFirstPage={currentIndex === 0}
      isLastPage={currentIndex === items.length - 1}
    >
      <Rows growsOnly>
        <View
          grows
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // flexGrow: 1,
          }}
        >
          {!!showButtons && !isFirstItem && !keyboard.shown && (
            <TouchableOpacity
              onPress={() => {
                if (currentIndex > 0) {
                  pagerRef.current?.setPage(currentIndex - 1);
                }
              }}
              disabled={isFirstItem}
              style={{
                paddingHorizontal: theme.spacing[2],
                paddingVertical: theme.spacing[10],
                // backgroundColor: theme.color.Transparent,
                backgroundColor: theme.color.Stone[800],
                borderRadius: theme.borderRadius.Md,
                // opacity: isFirstItem ? 0.4 : 1,
                opacity: 0.4,
                position: 'absolute',
                left: 0,
                zIndex: 1000,
              }}
            >
              <Icon
                size={28}
                // color={theme.color.Primary[400]}
                color={theme.color.White}
                name="ChevronLeft"
              />
            </TouchableOpacity>
          )}
          <View
            grows
            style={{
              zIndex: 0,
            }}
          >
            <PagerView
              style={{ flex: 1 }}
              ref={pagerRef}
              initialPage={initialPage}
              onPageSelected={(e) => {
                setCurrentIndex(e.nativeEvent.position);
                if (handleChange) {
                  handleChange(e.nativeEvent.position);
                }
              }}
            >
              {items.map((card, cardIndex) => (
                <View growsOnly key={cardIndex}>
                  {card.type === 'normal' && (
                    <View
                      grows
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: theme.spacing[3],
                      }}
                    >
                      {!!card.image && (
                        <View>
                          <Image
                            source={{
                              uri: card.image,
                            }}
                            style={{
                              height: Dimensions.get('window').width * 0.7,
                              width: Dimensions.get('window').width * 0.7,
                            }}
                            resizeMode="contain"
                            alt={card.label}
                          />
                        </View>
                      )}
                      <View
                        style={{
                          flexDirection: 'column',
                          gap: theme.spacing[2],
                        }}
                      >
                        {!!card.label && card.label.length > 1 && (
                          <Text
                            style={{
                              textAlign: 'center',
                              fontWeight: theme.fontWeight.Bold,
                              color: theme.color.Text,
                            }}
                          >
                            {card.label}
                          </Text>
                        )}
                        {!!card.description && (
                          <View
                            style={{
                              gap: theme.spacing[2],
                            }}
                          >
                            {card.description
                              .split('\n')
                              .filter((x) => x.length > 1)
                              .map((line, lineIndex) => (
                                <Text
                                  key={lineIndex}
                                  style={{
                                    textAlign: 'center',
                                    color: theme.color.Slate[600],
                                  }}
                                >
                                  {line}
                                </Text>
                              ))}
                          </View>
                        )}
                      </View>
                      {card.children}
                    </View>
                  )}
                  {card.type === 'raw' && card.children}
                </View>
              ))}
            </PagerView>
          </View>
          {!!showButtons && !isLastItem && !keyboard.shown && (
            <TouchableOpacity
              onPress={() => {
                if (currentIndex < items.length - 1) {
                  pagerRef.current?.setPage(currentIndex + 1);
                }
              }}
              disabled={isLastItem}
              style={{
                paddingHorizontal: theme.spacing[2],
                paddingVertical: theme.spacing[10],
                // backgroundColor: theme.color.Transparent,
                backgroundColor: theme.color.Stone[800],
                borderRadius: theme.borderRadius.Md,
                // opacity: isLastItem ? 0.4 : 1,
                opacity: 0.4,
                position: 'absolute',
                right: 0,
                zIndex: 1000,
              }}
            >
              <Icon
                size={28}
                // color={theme.color.Primary[400]}
                color={theme.color.White}
                name="ChevronRight"
              />
            </TouchableOpacity>
          )}
        </View>
        {!!showIndicators && !keyboard.shown && (
          <Columns
            gap={2}
            alignX="center"
            w={'Full'}
            py={4}
            style={{
              position: 'absolute',
              bottom: 0,
            }}
          >
            {items.map((_item, index) => (
              <Icon
                name={index === currentIndex ? 'CircleDot' : 'Circle'}
                size={16}
                key={index}
                color={
                  index === currentIndex
                    ? indicatorCurrentColor
                    : indicatorColor
                }
                darkColor={
                  index === currentIndex
                    ? indicatorCurrentDarkColor
                    : indicatorDarkColor
                }
              />
            ))}
          </Columns>
        )}
      </Rows>
    </CarouselProvider>
  );
}
