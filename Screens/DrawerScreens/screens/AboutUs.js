import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableHighlight, Linking } from 'react-native';

export default class AboutUs extends React.Component {
	render() {
		return (
			<SafeAreaView >
				<ScrollView>
					<View style={styles.container}>
						<Text style={styles.titleStyles} >About Us</Text>
					</View>
					<View style={styles.container}>
						<Image 
							source={require('../../../assets/IMG-20220819-WA0006.png')} 
							style={{ height: 100, width: 130 }}
						/>
					</View>
					<View style={[styles.container, { paddingHorizontal: 20 }]}>
						<Text style={styles.privacyStyles}>
							Neptune is the leading sports brand in Malaysia, producing quality sports equipment & sportswear.
						</Text>
						<Text style={styles.privacyStyles}>
							Products on our online shop are being updated fast. Here, we only sell authentic products.
						</Text>
						<Text style={styles.privacyStyles}>
							We are committed to the satisfaction of every one of you and guarantee 100% efficiency for all of our customers.
						</Text>
						<TouchableHighlight
							activeOpacity={0.6}
							underlayColor="#DDDDDD"
							style={{ padding: 20, borderRadius: 10 }}
							onPress={() => Linking.openURL('mailto:contactus@neptunesports.my')} 
						>
							<Text style={{ borderBottomWidth: 1 }} >
								contactus@neptunesports.my
							</Text>
						</TouchableHighlight>
					</View>
				</ScrollView>
			</SafeAreaView>
		
		);
	}
}

const styles = StyleSheet.create({
	container: { 
		flex: 1, 
		alignItems: 'center', 
		marginVertical: 20 
	},
	titleStyles: { 
		fontSize: 20, 
		fontWeight: 'bold' 
	},
	privacyStyles: { 
		textAlign: 'center', 
		marginVertical: 10 
	}
});